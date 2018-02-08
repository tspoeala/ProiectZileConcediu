<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Repository\DayOffRepository;
use AppBundle\Repository\FreeDaysRepository;
use AppBundle\Repository\TableHolidaysForEmployeeRepository;
use AppBundle\Service\CalendarService;
use AppBundle\Service\MailerService;
use AppBundle\Service\UserManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class UserController extends Controller
{
    private $myService;
    private $userManager;
    private $dayOffRepository;
    private $tableHolidaysForEmployeeRepository;
    private $freeDaysRepository;
    const types = [
        'CO' => 'Concediu de odihna',
        'WH' => 'Work from home',
        'MFD' => 'Move free day',
    ];

    public function __construct(
        CalendarService $myService,
        UserManager $userManager,
        DayOffRepository $dayOffRepository,
        TableHolidaysForEmployeeRepository $tableHolidaysForEmployeeRepository,
        FreeDaysRepository $freeDaysRepository
    ) {
        $this->myService = $myService;
        $this->userManager = $userManager;
        $this->dayOffRepository = $dayOffRepository;
        $this->tableHolidaysForEmployeeRepository = $tableHolidaysForEmployeeRepository;
        $this->freeDaysRepository = $freeDaysRepository;
    }

    public function deleteDayOffAction($id)
    {
        $this->dayOffRepository->deleteDayOffWhereField('id', $id);

        return $this->redirectToRoute('account');
    }

    public function myAccountAction(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        /** @var User $user */
        $user = $this->getUser();
        if ($this->isGranted('ROLE_ADMIN')) {
            $user = null;

            return $this->redirectToRoute('home');
        }

        $daysOffFromUser = $this->getInfo($user)['daysOffFromUser'];
        $daysOffRequest = $request->request->get('daterange');
        $type = $request->request->get('type');
        if ($request->isMethod('POST')) {
            if ($this->verifyNrOfDayOff($daysOffRequest, $type, $daysOffFromUser, $user->getId())) {
                return $this->redirectToRoute('account');
            }
            $this->myService->saveDateOff($user, $daysOffRequest, $type);

            return $this->redirectToRoute('account');
        }
        $freeDays = $this->myService->getFreeDaysForFullCalendar();

        $freeAndDaysOff = array_merge(
            $this->myService->getAllDayOffForUser($daysOffFromUser, 'CO'),
            $this->myService->getAllDayOffForUser($daysOffFromUser, 'WH'),
            $this->myService->getAllDayOffForUser($daysOffFromUser, 'MFD'),
            $this->myService->getFreeDays()
        );

        return $this->render(
            'user/myTeam.html.twig',
            [
                'usersFromTeam' => $this->getInfo($user)['usersFromTeam'],
                'user' => $user,
                'freeAndDayOff' => json_encode($freeAndDaysOff),
                'freeDays' => json_encode($freeDays),
                'daysOff' => json_encode($this->getInfo($user)['daysOff']),
                'daysOffFromUser' => $daysOffFromUser,
                'nrOfDaysOffForUser' => $this->getInfo($user)['nrOfDaysOff'],
                'types' => self::types,
            ]
        );
    }

    private function verifyNrOfDayOff($daysOffRequest, $type, $daysOffFromUser, $userId)
    {
        if ($type === 'CO'
            && $this->myService->limitDaysOffPerYear($daysOffRequest, $daysOffFromUser)
               > $this->myService->getNrDaysOffForUser($userId)
        ) {
            $this->addFlash(
                'warning',
                'You have the right at '
                . $this->myService->getNrDaysOffForUser($userId)
                . ' days off per year.'
            );

            return $this->redirectToRoute('account');
        }
        if ($type === 'WH'
            && $this->myService->limitWorkFromHomeDays($daysOffRequest, $daysOffFromUser)
               > $this->container->getParameter('max_workfromhome_days')
        ) {
            $this->addFlash(
                'warning',
                'You have the right at '
                . $this->container->getParameter('max_workfromhome_days')
                . ' days of work from home per month.'
            );

            return $this->redirectToRoute('account');
        }
    }

    private function getInfo(User $user)
    {
        return [
            'daysOffFromUser' => $this->myService->getDaysOffByUserId($user->getId()),
            'usersFromTeam' => $this->userManager->getUsersByTeam($user->getTeam()),
            'daysOff' => $this->myService->getDaysOffForFullCalendar($user),
            'nrOfDaysOff' => $this->myService->getNrDaysOffForUser($user->getId()),
        ];
    }

    public function moveFreeDayAction(Request $request)
    {
        $user = $this->getUser();
        if ($request->isMethod('POST')&& $_POST['day']) {
            $dayOff = $_POST['day'];
            $freeDayId = $_POST['freeDayId'];
            $dateFreeDay =
                ($this->freeDaysRepository->findFreeDayWhereField('id', $freeDayId)[0])->getDate()->format('Y-m-d');
            if ($this->dayOffRepository->findDayOffWhereUserAndDateFrom($user, $dateFreeDay)) {
                $id =
                    $this->dayOffRepository->findDayOffWhereUserAndDateFrom($user, $dateFreeDay)[0]->getId();
                $this->dayOffRepository->deleteDayOffWhereField('id', $id);
            }
            $this->myService->moveFreeDayTo($freeDayId, $user, $dayOff);
        }

        return $this->redirectToRoute('home');
    }
}
