<?php

namespace AppBundle\Repository;

use AppBundle\Entity\DayOff;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

class DayOffRepository extends ServiceEntityRepository
{
    public function save($dateStart, $dateEnd, $dateFrom, $userId, $type)
    {
        $dayOff = new DayOff();
        $dayOff->setDateStart($dateStart);
        $dayOff->setDateEnd($dateEnd);
        $dayOff->setUser($userId);
        $dayOff->setType($type);
        $dayOff->setDateFrom($dateFrom);
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
                    ->select('do')
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

    public function deleteDayOffWhereField($field, $value)
    {
        return $this->getEntityManager()
                    ->createQueryBuilder()
                    ->delete('AppBundle:DayOff', 'do')
                    ->where("do.$field=?1")
                    ->setParameter(1, $value)
                    ->getQuery()
                    ->getResult();
    }

    public function findDayOffWhereUserIdAndDateFrom($user, $dateFrom)
    {
        return $this->getEntityManager()
                    ->createQueryBuilder()
                    ->select('do')
                    ->from('AppBundle:DayOff', 'do')
                    ->where("do.user=?1")
                    ->setParameter(1, $user)
                    ->andWhere("do.dateFrom=?2")
                    ->setParameter(2, $dateFrom)
                    ->getQuery()
                    ->getResult();
    }
}
