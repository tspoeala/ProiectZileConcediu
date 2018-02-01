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
use Symfony\Component\HttpFoundation\RedirectResponse;
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

            return new RedirectResponse($this->router->generate('add_team'));
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

            return new RedirectResponse($this->router->generate('add_free_days'));
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

            $existsHolidaysForEmployee = $this->tableHolidaysForEmployeeRepository->findHolidaysWhereUserId($userId)[0];
            if ($existsHolidaysForEmployee) {
                $em = $this->getDoctrine()->getManager();
                $existsHolidaysForEmployee->setNumberOfDaysOff($numberOfLegalDayOff);
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
        $message = (new \Swift_Message('Hello Email'))
            ->setFrom('andreea_spoeala@yahoo.com')
            ->setTo('andreea_spoeala@yahoo.com')
            ->setBody(
                $this->renderView(
                    'emails/exampleEmail.html.twig'
                //                    ['name' => 'Teodora']
                ),
                'text/html'
            )/*
             * If you also want to include a plaintext version of the message
            ->addPart(
                $this->renderView(
                    'Emails/registration.txt.twig',
                    array('name' => $name)
                ),
                'text/plain'
            )
            */
        ;

        $mailer->send($message);

        // or, you can also fetch the mailer service this way
        // $this->get('mailer')->send($message);

        return $this->render('vacationDays/blank.html.twig');
    }
}
