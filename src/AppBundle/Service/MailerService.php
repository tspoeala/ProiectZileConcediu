<?php

namespace AppBundle\Service;

class MailerService
{
    private $mailer;
    private $adminEmail = 'andreeateo554@gmail.com';

    public function __construct(\Swift_Mailer $mailer)
    {
        $this->mailer = $mailer;
    }

    public function sendMessageToTeamMembers($userEmail, $userName, $periodOfHoliday)
    {
        $message = \Swift_Message::newInstance()
            ->setSubject('Concediu coleg')
            ->setFrom($this->adminEmail)
            ->setTo($userEmail)
            ->setBody(
                'Membrul ' . $userName . ' are concediu in perioada ' . $periodOfHoliday . ' ', 'text/html'
            );
        $this->mailer->send($message);
    }
}