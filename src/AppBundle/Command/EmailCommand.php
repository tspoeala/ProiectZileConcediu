<?php
/**
 * Created by PhpStorm.
 * User: teodora.spoeala
 * Date: 12/4/2017
 * Time: 5:15 PM
 */

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
//            ->addArgument('emailfrom', InputArgument::REQUIRED, 'What\'s the sender email address?')
//            ->addArgument('emailto', InputArgument::REQUIRED, 'What\'s the recipient email address?')
//            ->addArgument('subject', InputArgument::REQUIRED, 'What\'s the email subject?');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->mailerService->sendMessageToTeamMembers('andreea_spoeala@yahoo.com', 'Andreea', '27-28');
//        $emailfrom = $input->getArgument('emailfrom');
//        $emailto = $input->getArgument('emailto');
//
//        $subject = $input->getArgument('subject');
//
//        if ($emailfrom && $emailto) {
//
//            $message = \Swift_Message::newInstance()
//                ->setSubject($subject)
//                ->setFrom($emailfrom)
//                ->setTo($emailto)
//                ->setBody('test');
////            $this->mailer->send($message);
//            $this->getContainer()->get('mailer')->send($message);
//
//            $text = "Email sent!";
//        } else {
//            $text = 'Email not sent';
//        }
//
        $output->writeln("Email sent!");
//        $container = $this->getContainer();
//        $mailer = $container->get('mailer');
//        $spool = $mailer->getTransport()->getSpool();
//        $transport = $container->get('swiftmailer.transport.real');
//
//        $spool->flushQueue($transport);
    }
}