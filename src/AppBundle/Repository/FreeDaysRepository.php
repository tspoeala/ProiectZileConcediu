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

    public function deleteFreeDayWhereId($id)
    {
        return $this->getEntityManager()
                    ->createQueryBuilder()
                    ->delete('AppBundle:FreeDays', 'fd')
                    ->where('fd.id=?1')
                    ->setParameter(1, $id)
                    ->getQuery()
                    ->getResult();
    }

    public function findFreeDayWhereId($id)
    {
        return $this->getEntityManager()
                    ->createQueryBuilder()
                    ->select('fd')
                    ->from('AppBundle:FreeDays', 'fd')
                    ->where("fd.id=:id")
                    ->setParameter('id', $id)
                    ->getQuery()
                    ->getResult();
    }

    public function findFreeDayWhereField($field, $value)
    {
        return $this->getEntityManager()
                    ->createQueryBuilder()
                    ->select('fd')
                    ->from('AppBundle:FreeDays', 'fd')
                    ->where("fd.$field=:$field")
                    ->setParameter("$field", $value)
                    ->getQuery()
                    ->getResult();
    }
}
