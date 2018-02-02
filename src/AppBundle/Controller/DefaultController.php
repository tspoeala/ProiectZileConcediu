<?php

namespace AppBundle\Controller;

use AppBundle\Service\CalendarService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction(CalendarService $calendarService)
    {
        if ($this->isGranted('ROLE_USER') && !$this->isGranted('ROLE_ADMIN')) {
            return $this->redirectToRoute('account');
        }
        $freeDays = $calendarService->getFreeDaysForFullCalendar();
        $daysOff = $calendarService->getDaysOffForFullCalendar();
//        dump($daysOff);
//        die(__FILE__ . " Line: " . __LINE__);

        return $this->render(
            'vacationDays/index.html.twig',
            [
                'freeDays' => json_encode($freeDays),
                'daysOff' => json_encode($daysOff),
            ]
        );
    }
}
