<?php

namespace AppBundle\Service;

use AppBundle\Entity\DayOff;
use AppBundle\Entity\FreeDays;
use AppBundle\Entity\User;
use AppBundle\Repository\DayOffRepository;
use AppBundle\Repository\FreeDaysRepository;
use AppBundle\Repository\UserRepository;
use DateInterval;
use DatePeriod;
use DateTime;

class CalendarService
{
    private $userRepository;
    private $daysOffRepository;
    private $freeDaysRepository;
    private $userManager;

    public function __construct(
        UserRepository $userRepository,
        DayOffRepository $daysOffRepository,
        FreeDaysRepository $freeDaysRepository,
        UserManager $userManager
    ) {
        $this->userRepository = $userRepository;
        $this->daysOffRepository = $daysOffRepository;
        $this->freeDaysRepository = $freeDaysRepository;
        $this->userManager = $userManager;
    }

    public function getDaysOffForFullCalendar($userLogged)
    {
        /**
         * @var User $userLogged
         */
        if ($userLogged !== null) {
            $users = $this->userManager->getUsersByTeam($userLogged->getTeam());

            return $this->getDaysOffForUsers($users);
        }
        $users = $this->userRepository->getAllUsers();

        return $this->getDaysOffForUsers($users);
    }

    public function generateRandomColor()
    {
//        $color = '#';
//        $colorHexLighter = ["9", "A", "B", "C", "D", "E", "F"];
//        for ($x = 0; $x < 6; $x++):
//            $color .= $colorHexLighter[array_rand($colorHexLighter, 1)];
//        endfor;
//
//        return substr($color, 0, 7);
        $randomcolor = '#' . strtoupper(dechex(rand(0, 10000000)));
        if (strlen($randomcolor) != 7) {
            $randomcolor = str_pad($randomcolor, 10, '0', STR_PAD_RIGHT);
            $randomcolor = substr($randomcolor, 0, 7);
        }

        return $randomcolor;
    }

    public function getDaysOffForUsers($users)
    {
        $daysOffFormatted = [];
        $usersWithDaysOff = [];
        /**
         * @var User   $user
         * @var DayOff $dayOff
         */
        foreach ($users as $keyUser => $user) {
            foreach ($user->getDaysOff() as $keyDayOff => $dayOff) {

                $daysOffFormatted[$keyUser][$keyDayOff]['start'] = $dayOff->getDateStart()->format('Y-m-d');
                $daysOffFormatted[$keyUser][$keyDayOff]['end'] = $dayOff->getDateEnd()->modify('+1 day')->format('Y-m-d');
                $daysOffFormatted[$keyUser][$keyDayOff]['title'] = 'Concediu de odihna ' . $user->getFirstname() . ' ' . $user->getLastname();
                $usersWithDaysOff[$user->getUsername()]['daysOff'] = $daysOffFormatted[$keyUser];
                $usersWithDaysOff[$user->getUsername()]['color'] = $this->generateRandomColor();
            }
        }

        return $usersWithDaysOff;
    }

    public function getFreeDaysForFullCalendar()
    {
        $freeDaysFormatted = [];
        $freeDays = $this->freeDaysRepository->getFreeDays();
        if (!empty($freeDays)) {
            /**
             * @var FreeDays $freeDay
             */
            foreach ($freeDays as $key => $freeDay) {
                $freeDaysFormatted[$key]['start'] = $freeDay->getDate()->format('Y-m-d');
                $freeDaysFormatted[$key]['title'] = $freeDay->getName();
            }
        }

        return $freeDaysFormatted;
    }

    public function getDaysOffByUserId($userId)
    {

        $daysOffFormatted = [];

        $daysOff = $this->daysOffRepository->getAllDaysOffWhereUserId($userId);
        if (!empty($daysOff)) {
            /**
             * @var DayOff $dayOff
             */
            foreach ($daysOff as $dayOff) {
                $daysOffFormatted[] = [
                    'id' => $dayOff->getId(),
                    'dayStart' => $dayOff->getDateStart()->format('m/d/Y'),
                    'dayEnd' => $dayOff->getDateEnd()->format('m/d/Y'),
                ];
            }
        }

        return $daysOffFormatted;
    }

    public function datePeriod_start_end($begin, $end)
    {

        $begin = new DateTime($begin);

        $end = new DateTime($end . ' + 1 day');

        $daterange = new DatePeriod($begin, new DateInterval('P1D'), $end);
        $dates = [];
        foreach ($daterange as $date) {
            $dates[] = $date->format("m/d/Y");
        }

        return $dates;
    }

    public function getAllDayOffForUser($daysOffFromUser)
    {
        //put the day off between dayStart and dayEnd
        $allDayOff = [];
        foreach ($daysOffFromUser as $dayOffFromUser) {
            $allDayOff = array_merge($allDayOff,
                $this->datePeriod_start_end($dayOffFromUser['dayStart'], $dayOffFromUser['dayEnd']));
        }

        return $allDayOff;
    }

    public function getFreeDays()
    {
        $freeDaysFormatted = [];

        $freeDays = $this->freeDaysRepository->getFreeDays();
        if (!empty($freeDays)) {
            /**
             * @var FreeDays $freeDay
             */
            foreach ($freeDays as $freeDay) {
                $freeDaysFormatted[] = $freeDay->getDate()->format('m/d/Y');
            }
        }

        return $freeDaysFormatted;
    }

    public function saveDateOff($user, $daysOff)
    {
        $daysOffStartEnd = explode(' - ', $daysOff);
        if (count($daysOffStartEnd) == 2) {
            $dateStart = new DateTime($daysOffStartEnd[0]);
            $dateEnd = new DateTime($daysOffStartEnd[1]);

            $this->daysOffRepository->save($dateStart, $dateEnd, $user);
        }
    }

    public function saveFreeDay($date, $name)
    {
        if (!empty($date) && !empty($name)) {
            $date = new DateTime($date);
            $this->freeDaysRepository->save($date, $name);
        }
    }
}