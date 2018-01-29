<?php

namespace AppBundle\Repository;

use AppBundle\Entity\DayOff;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

class DayOffRepository extends ServiceEntityRepository
{
    public function save($dateStart, $dateEnd, $userId, $type)
    {
        $dayOff = new DayOff();
        $dayOff->setDateStart($dateStart);
        $dayOff->setDateEnd($dateEnd);
        $dayOff->setUser($userId);
        $dayOff->setType($type);
        $this->getEntityManager()->persist($dayOff);
        $this->getEntityManager()->flush();
    }

    public function getAllDaysOffWhereUserId($userId)
    {
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('do')
            ->from('AppBundle:DayOff', 'do')
            ->where('do.user=:value')
            ->setParameter('value', $userId)
            ->getQuery()
            ->getResult();
    }

    public function findDayOffWhereField($field, $value)
    {
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('do.id', 'do.userId', 'do.dateStart', 'do.dateEnd')
            ->from('AppBundle:DayOff', 'do')
            ->where("do.$field=:$field")
            ->setParameter("$field", $value)
            ->getQuery()
            ->getResult();
    }

    public function findDayOff($field, $value)
    {
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('do')
            ->from('AppBundle:DayOff', 'do')
            ->where("do.$field=:$field")
            ->setParameter("$field", $value)
            ->getQuery()
            ->getResult();
    }

    public function deleteDayOffWhereId($id)
    {
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->delete('AppBundle:DayOff', 'do')
            ->where('do.id=?1')
            ->setParameter(1, $id)
            ->getQuery()
            ->getResult();
    }
}
