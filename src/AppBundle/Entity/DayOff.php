<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;

/**
 * DayOff
 * @ORM\Entity(repositoryClass="AppBundle\Repository\DayOffRepository")
 */
class DayOff
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;
    /**
     * @var \DateTime
     * @ORM\Column(name="dateStart", type="datetime")
     */
    private $dateStart;
    /**
     * @var \DateTime
     * @ORM\Column(name="dateEnd", type="datetime")
     */
    private $dateEnd;
    /**
     * @var \DateTime
     * @ORM\Column(name="dateFrom", type="datetime", nullable=true)
     */
    private $dateFrom;
    /**
     * @ManyToOne(targetEntity="AppBundle\Entity\User")
     * @JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $user;
    /**
     * @ORM\Column(name="type", type="string", length=50)
     */
    private $type;

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
     * @return mixed
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param mixed $user
     *
     * @return DayOff
     */
    public function setUser($user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Set dateStart
     *
     * @param \DateTime $dateStart
     *
     * @return DayOff
     */
    public function setDateStart($dateStart)
    {
        $this->dateStart = $dateStart;

        return $this;
    }

    /**
     * Get dateStart
     *
     * @return \DateTime
     */
    public function getDateStart()
    {
        return $this->dateStart;
    }

    /**
     * Set dateEnd
     *
     * @param \DateTime $dateEnd
     *
     * @return DayOff
     */
    public function setDateEnd($dateEnd)
    {
        $this->dateEnd = $dateEnd;

        return $this;
    }

    /**
     * Get dateEnd
     *
     * @return \DateTime
     */
    public function getDateEnd()
    {
        return $this->dateEnd;
    }

    /**
     * Set dateEnd
     *
     * @param \DateTime $dateFrom
     *
     * @return DayOff
     */
    public function setDateFrom($dateFrom)
    {
        $this->dateFrom = $dateFrom;

        return $this;
    }

    /**
     * Get dateFrom
     *
     * @return \DateTime
     */
    public function getDateFrom()
    {
        return $this->dateFrom;
    }

    /**
     * Set type
     *
     * @param string $type
     *
     * @return DayOff
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */

    public function getType()
    {
        return $this->type;
    }
}

