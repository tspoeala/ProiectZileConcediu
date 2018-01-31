<?php
declare(strict_types=1);

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;

/**
 * TableHolidaysForEmployee
 * @ORM\Entity(repositoryClass="AppBundle\Repository\TableHolidaysForEmployeeRepository")
 */
class TableHolidaysForEmployee
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;
    /**
     * @ORM\Column(name="userId", type="integer")
     */
    private $userId;
    /**
     * @ORM\Column(name="numberOfDaysOff", type="integer")
     */
    private $numberOfDaysOff;

    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get userId
     *
     * @return int
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * @param int $userId
     *
     * @return TableHolidaysForEmployee
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;

        return $this;
    }

    /**
     * Set numberOfDaysOff
     *
     * @param integer $numberOfDaysOff
     *
     * @return TableHolidaysForEmployee
     */
    public function setNumberOfDaysOff($numberOfDaysOff)
    {
        $this->numberOfDaysOff = $numberOfDaysOff;

        return $this;
    }

    /**
     * Get numberOfFreeDays
     *
     * @return integer
     */

    public function getNumberOfDaysOff()
    {
        return $this->numberOfDaysOff;
    }
}
