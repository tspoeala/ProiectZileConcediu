<?php

namespace AppBundle\Controller;

use AppBundle\Entity\TableHolidaysForEmployee;
use AppBundle\Entity\Team;
use AppBundle\Form\Type\TeamType;
use AppBundle\Repository\FreeDaysRepository;
use AppBundle\Repository\TableHolidaysForEmployeeRepository;
use AppBundle\Repository\UserRepository;
use AppBundle\Service\CalendarService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\RouterInterface;

class AdminController extends Controller
{
    private $myService;
    private $router;
    private $userRepository;
    private $tableHolidaysForEmployeeRepository;
    private $freeDaysRepository;

    public function __construct(
        CalendarService $myService,
        UserRepository $userRepository,
        TableHolidaysForEmployeeRepository $tableHolidaysForEmployeeRepository,
        FreeDaysRepository $freeDaysRepository,
        RouterInterface $router
    ) {
        $this->myService = $myService;
        $this->router = $router;
        $this->userRepository = $userRepository;
        $this->tableHolidaysForEmployeeRepository = $tableHolidaysForEmployeeRepository;
        $this->freeDaysRepository = $freeDaysRepository;
    }

    public function addTeamAction(Request $request)
    {
        $team = new Team();
        $form = $this->createForm(TeamType::class, $team);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $team = $form->getData();
            $em = $this->getDoctrine()->getManager();
            $em->persist($team);
            $em->flush();
            $this->addFlash("success", "Congratulation! You add a new team!");

            return $this->redirectToRoute('add_team');
        }

        return $this->render(
            'admin/addTeam.html.twig',
            ['form' => $form->createView()]
        );
    }

    public function deleteFreeDayAction($id)
    {
        $this->freeDaysRepository->deleteFreeDayWhereId($id);

        return $this->redirectToRoute('add_free_days');
    }

    public function getUsersAction()
    {
        return $this->render(

            'admin/users.html.twig',
            [
                'users' => $this->userRepository->getAllUsers(),
                'holidays' => $this->tableHolidaysForEmployeeRepository->getAllHolidays(),

            ]
        );
    }

    public function addFreeDaysAction(Request $request)
    {
        $date = $request->request->get('_date');
        $name = $request->request->get('_name');
        if ($request->isMethod('POST')) {
            $this->myService->saveFreeDay($date, $name);

            return $this->redirectToRoute('add_free_days');
        }
        $freeDays = $this->myService->getFreeDays();

        return $this->render(
            'admin/addFreeDays.html.twig',
            [
                'freeDays' => json_encode($freeDays),
                'freeDaysAll' => $this->myService->getFreeDaysForFullCalendar(),
            ]
        );
    }

    public function addNumberOfFreeDayForUserAction(Request $request)
    {
        if ($request->isMethod('POST')) {
            $lastname = $request->request->get('name');
            $userId = $this->userRepository->findUserIdWhereField('lastname', $lastname)[0]['id'];
            $numberOfLegalDayOff = $request->request->get('number');
            if (!preg_match('/^[1-9][0-9]$/', $numberOfLegalDayOff)) {
                $this->addFlash(
                    'warning',
                    'You can only enter 2 digits'
                );

                return $this->redirectToRoute('users');
            }

            $existsHolidaysForEmployee = $this->tableHolidaysForEmployeeRepository->findHolidaysWhereUserId($userId);
            if ($existsHolidaysForEmployee) {
                $em = $this->getDoctrine()->getManager();
                $existsHolidaysForEmployee[0]->setNumberOfDaysOff($numberOfLegalDayOff);
                $em->flush();

                return $this->redirectToRoute('users');
            }
            $tableHolidaysForEmployee = new TableHolidaysForEmployee();
            $tableHolidaysForEmployee->setUserId($userId);
            $tableHolidaysForEmployee->setNumberOfDaysOff($numberOfLegalDayOff);
            $em = $this->getDoctrine()->getManager();
            $em->persist($tableHolidaysForEmployee);
            $em->flush();

            return $this->redirectToRoute('users');
        }

        return $this->render(
            'admin/users.html.twig',
            [
                'users' => $this->userRepository->getAllUsers(),
            ]
        );
    }

    //it doesn't work
    public function indexAction(
        \Swift_Mailer $mailer
    ) {
        $message = (new \Swift_Message())
            ->setSubject('Hello Email')
            ->setFrom('andreea_spoeala@yahoo.com')
            ->setTo('andreea.spoeala@gmail.com')
            ->setBody('Here is the message itself')

            ->addPart('<q>Here is the message itself</q>', 'text/html')
//            ->setBody(
//                $this->renderView(
//                    'emails/exampleEmail.html.twig'
//                //                    ['name' => 'Teodora']
//                ),
//                'text/html'
//            )/*
//             * If you also want to include a plaintext version of the message
//            ->addPart(
//                $this->renderView(
//                    'Emails/registration.txt.twig',
//                    array('name' => $name)
//                ),
//                'text/plain'
//            )
//            */
        ;
        //        dump($mailer->send($message));
        //        die(__FILE__ . " Line: " . __LINE__);
        if (!$mailer->send($message)) {
            $this->addFlash(
                'warning',
                'The email is not sent'
            );
        }


        return $this->render('vacationDays/blank.html.twig');
    }
}
