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

class MyService
{
    private $userRepository;
    private $daysOffRepository;
    private $freeDaysRepository;

    public function __construct(
        UserRepository $userRepository,
        DayOffRepository $daysOffRepository,
        FreeDaysRepository $freeDaysRepository
    ) {
        $this->userRepository = $userRepository;
        $this->daysOffRepository = $daysOffRepository;
        $this->freeDaysRepository = $freeDaysRepository;
    }

    public function getUsersByTeam($userTeam)
    {
        return $this->userRepository->findUserWhereField('team', $userTeam);
    }

    public function getDaysOffForFullCalendar($userLogged)
    {
        if ($userLogged !== 'anon.') {
            /**
             * @var User $userLogged
             */
            $users = $this->getUsersByTeam($userLogged->getTeam());
        } else {
            $users = $this->userRepository->getAllUsers();
        }

        $daysOffFormatted = [];
        /**
         * @var User   $user
         * @var DayOff $dayOff
         */
        foreach ($users as $key1 => $user) {
            foreach ($user->getDaysOff() as $key => $dayOff) {

                $users[$user->getUsername()][] = $dayOff->getDateStart()->format('Y-m-d') . ' ' . $dayOff->getDateEnd()->format('Y-m-d');
                $daysOffFormatted[$key1][$key]['start'] = $dayOff->getDateStart()->format('Y-m-d');
                $daysOffFormatted[$key1][$key]['end'] = $dayOff->getDateEnd()->modify('+1 day')->format('Y-m-d');
                $daysOffFormatted[$key1][$key]['title'] = 'Concediu de odihna ' . $user->getFirstname() . ' ' . $user->getLastname();
            }
        }

        $daysOff = [];
        foreach ($daysOffFormatted as $key => $dayOffFormatted) {
            $daysOff = array_merge($daysOff, $daysOffFormatted[$key]);
        }

        return $daysOff;
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

        $end = new DateTime($end . ' +1 day');

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
        $daysOffStartEnd = explode('-', $daysOff);
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