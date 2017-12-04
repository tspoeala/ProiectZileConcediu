<?php

namespace AppBundle\Controller;

use AppBundle\Service\MyService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class UserController extends Controller
{
    private $myService;

    public function __construct(MyService $myService)
    {
        $this->myService = $myService;
    }

    public function indexAction()
    {
        $userLogged = $this->get('security.token_storage')->getToken()->getUser();
        $freeDays = $this->myService->getFreeDaysForFullCalendar();
        $daysOff = $this->myService->getDaysOffForFullCalendar($userLogged);
        $freeAndDaysOff = array_merge($freeDays, $daysOff);

        return $this->render('vacationDays/index.html.twig', [
            'freeAndDaysOff' => json_encode($freeAndDaysOff),
        ]);
    }

    public function myTeamAction(Request $request)
    {
        $user = $this->get('security.token_storage')->getToken()->getUser();
        $daysOff = $request->request->get('daterange');
        $this->myService->saveDateOff($user, $daysOff);

        $usersFromTeam = $this->myService->getUsersByTeam($user->getTeam());
        $daysOffFromUser = $this->myService->getDaysOffByUserId($user->getId());
        $freeAndDayOffForFullCalendar = array_merge($this->myService->getFreeDaysForFullCalendar(),
            $this->myService->getDaysOffForFullCalendar($user));
        $freeAndDayOff = array_merge($this->myService->getAllDayOffForUser($daysOffFromUser),
            $this->myService->getFreeDays());

        return $this->render('user/myTeam.html.twig', [
            'usersFromTeam' => $usersFromTeam,
            'freeAndDayOff' => json_encode($freeAndDayOff),
            'freeAndDaysOffForFullCalendar' => json_encode($freeAndDayOffForFullCalendar),
            'daysOffFromUser' => $daysOffFromUser,
        ]);
    }
}