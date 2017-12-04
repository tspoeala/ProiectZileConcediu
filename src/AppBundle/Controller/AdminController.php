<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Team;
use AppBundle\Form\Type\TeamType;
use AppBundle\Service\MyService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class AdminController extends Controller
{
    private $myService;

    public function __construct(MyService $myService)
    {
        $this->myService = $myService;
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
        $this->myService->saveFreeDay($date, $name);
        $freeDays = $this->myService->getFreeDays();

        return $this->render(
            'admin/addFreeDays.html.twig',
            ['freeDays' => json_encode($freeDays)]
        );
    }
}