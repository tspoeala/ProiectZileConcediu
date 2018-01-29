<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Team;
use AppBundle\Form\Type\TeamType;
use AppBundle\Service\CalendarService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\RouterInterface;

class AdminController extends Controller
{
    private $myService;
    private $router;

    public function __construct(CalendarService $myService, RouterInterface $router)
    {
        $this->myService = $myService;
        $this->router = $router;
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
            ['freeDays' => json_encode($freeDays)]
        );
    }

    public function indexAction(\Swift_Mailer $mailer)
    {
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