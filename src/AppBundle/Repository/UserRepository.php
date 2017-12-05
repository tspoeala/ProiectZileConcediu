<?php

namespace AppBundle\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\Security\User\UserLoaderInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserRepository extends ServiceEntityRepository implements UserLoaderInterface
{
    public function getAllUsers()
    {
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('u')
            ->from('AppBundle:User', 'u')
            ->getQuery()
            ->getResult();
    }

    public function findUserWhereTeam($value)
    {
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('u')
            ->from('AppBundle:User', 'u')
            ->where("u.team=:team")
            ->setParameter('team', $value)
            ->getQuery()
            ->getResult();
    }

    public function findUserWhereEmailAndPassword($email, $password)
    {
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('u')
            ->from('AppBundle:User', 'u')
            ->where('u . email:email')
            ->andWhere('u . password =:password')
            ->setParameter('email', $email)
            ->setParameter('password', $password)
            ->getQuery()
            ->getResult();
    }

    /**
     * Loads the user for the given username.
     *
     * This method must return null if the user is not found.
     *
     * @param string $username The username
     *
     * @return UserInterface|null
     */
    public function loadUserByUsername($username)
    {
        return $this->createQueryBuilder('u')
            ->where('u . username = :username OR u . email = :email')
            ->setParameter('username', $username)
            ->setParameter('email', $username)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
