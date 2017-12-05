<?php

namespace AppBundle\Service;

use AppBundle\Repository\UserRepository;

class UserManager
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getUsersByTeam($userTeam)
    {
        return $this->userRepository->findUserWhereTeam($userTeam);
    }
}