<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Repository\DayOffRepository;
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


    public function __construct(
        CalendarService $myService,
        UserManager $userManager,
        DayOffRepository $dayOffRepository
    ) {
        $this->myService = $myService;
        $this->userManager = $userManager;
        $this->dayOffRepository = $dayOffRepository;
    }

    public function deleteDayOffAction($id)
    {
        $this->dayOffRepository->deleteDayOffWhereId($id);

        return $this->redirectToRoute('account');
    }

    public function myTeamAction(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        /** @var User $user */
        $user = $this->getUser();
        if ($this->isGranted('ROLE_ADMIN')) {
            return $this->redirectToRoute('home');
        }

        $daysOffFromUser = $this->getInfo($user)['daysOffFromUser'];
        $daysOffRequest = $request->request->get('daterange');
        $type = $request->request->get('type');
        if ($request->isMethod('POST')) {
            if ($type === 'WH'
                && $this->myService->limitWorkFromHomeDays($daysOffRequest, $daysOffFromUser)
                   > CalendarService::MAX_WH_DAYS
            ) {
                $this->addFlash(
                    'warning',
                    'You have the right at ' . CalendarService::MAX_WH_DAYS . ' days of work from home per month.'
                );

                return $this->redirectToRoute('account');
            }
            $this->myService->saveDateOff($user, $daysOffRequest, $type);

            return $this->redirectToRoute('account');
        }
        $freeDays = $this->myService->getFreeDaysForFullCalendar();

        $freeAndDayOff = array_merge(
            $this->myService->getAllDayOffForUser($daysOffFromUser),
            $this->myService->getFreeDays()
        );

        return $this->render(
            'user/myTeam.html.twig',
            [
                'usersFromTeam' => $this->getInfo($user)['usersFromTeam'],
                'user' => $user,
                'freeAndDayOff' => json_encode($freeAndDayOff),
                'freeDays' => json_encode($freeDays),
                'daysOff' => json_encode($this->getInfo($user)['daysOff']),
                'daysOffFromUser' => $daysOffFromUser,
            ]
        );
    }

    public function sendNewEmailAction(
        MailerService $mailerService
    ) {
        $user = $this->getUser();
        $mailerService->sendMessageToTeamMembers('andreea_spoeala@yahoo.com', 'ana', '2');

        return $this->redirectToRoute('home');
    }

    private function getInfo(User $user)
    {
        return [
            'daysOffFromUser' => $this->myService->getDaysOffByUserId($user->getId()),
            'usersFromTeam' => $this->userManager->getUsersByTeam($user->getTeam()),
            'daysOff' => $this->myService->getDaysOffForFullCalendar($user),
        ];
    }
}
