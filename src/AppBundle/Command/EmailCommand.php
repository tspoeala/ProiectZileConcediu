<?php

namespace AppBundle\Command;

use AppBundle\Service\MailerService;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class EmailCommand extends Command
{
    private $mailerService;

    public function __construct(MailerService $mailerService, $name = null)
    {
        parent::__construct($name);
        $this->mailerService = $mailerService;
    }

    protected function configure()
    {
        $this
            ->setName('app:sendEmail')
            ->setDescription('Send email');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->mailerService->sendMessageToTeamMembers('andreea_spoeala@yahoo.com', 'Andreea', '27-28');
        $output->writeln("Email sent!");
    }

    //it doesn't work
    public function email(
        \Swift_Mailer $mailer
    ) {
        $message = (new \Swift_Message())
            ->setSubject('Hello Email')
            ->setFrom('exampleEmail')
            ->setTo('exampleEmail')
            ->setBody('Here is the message itself')
            ->addPart('<q>Here is the message itself</q>', 'text/html');
        if (!$mailer->send($message)) {
            $this->addFlash(
                'warning',
                'The email is not sent'
            );
        }

        return $this->render('vacationDays/blank.html.twig');
    }
}
