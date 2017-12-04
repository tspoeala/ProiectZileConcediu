<?php

namespace AppBundle\Repository;

use AppBundle\Entity\FreeDays;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

class FreeDaysRepository extends ServiceEntityRepository
{
    public function save($date, $name)
    {
        $freeDay = new FreeDays();
        $freeDay->setDate($date);
        $freeDay->setName($name);
        $this->getEntityManager()->persist($freeDay);
        $this->getEntityManager()->flush();
    }

    public function getFreeDays()
    {
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('fd')
            ->from('AppBundle:FreeDays', 'fd')
            ->getQuery()
            ->getResult();
    }
}
