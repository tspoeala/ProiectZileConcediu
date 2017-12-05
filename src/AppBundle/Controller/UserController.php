<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Service\CalendarService;
use AppBundle\Service\MailerService;
use AppBundle\Service\UserManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\RouterInterface;

class UserController extends Controller
{
    private $myService;
    private $router;
    private $userManager;

    public function __construct(CalendarService $myService, UserManager $userManager, RouterInterface $router)
    {
        $this->myService = $myService;
        $this->router = $router;
        $this->userManager = $userManager;
    }

    public function indexAction()
    {
        $userLogged = $this->getUser();
        $freeDays = $this->myService->getFreeDaysForFullCalendar();
        $daysOff = $this->myService->getDaysOffForFullCalendar($userLogged);

        return $this->render('vacationDays/index.html.twig', [
            'freeDays' => json_encode($freeDays),
            'daysOff' => json_encode($daysOff),
        ]);
    }

    public function myTeamAction(Request $request)
    {
        /**
         * @var User $user
         */
        $user = $this->getUser();
        $daysOff = $request->request->get('daterange');
        if ($request->isMethod('POST')) {
            $this->myService->saveDateOff($user, $daysOff);

            return new RedirectResponse($this->router->generate('team'));
//            $this->redirectToRoute('team');
        }
        $usersFromTeam = $this->userManager->getUsersByTeam($user->getTeam());
        $daysOffFromUser = $this->myService->getDaysOffByUserId($user->getId());
        $freeDays = $this->myService->getFreeDaysForFullCalendar();
        $daysOff = $this->myService->getDaysOffForFullCalendar($user);
        $freeAndDayOff = array_merge($this->myService->getAllDayOffForUser($daysOffFromUser),
            $this->myService->getFreeDays());

        return $this->render('user/myTeam.html.twig', [
            'usersFromTeam' => $usersFromTeam,
            'freeAndDayOff' => json_encode($freeAndDayOff),
            'freeDays' => json_encode($freeDays),
            'daysOff' => json_encode($daysOff),
            'daysOffFromUser' => $daysOffFromUser,
        ]);
    }

    public function sendNewEmail(MailerService $mailerService)
    {
        $user = $this->getUser();
        $mailerService->sendMessageToTeamMembers($user);
    }
}