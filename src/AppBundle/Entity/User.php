<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\OneToMany;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use AppBundle\Validator\Constraints as UserAssert;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * User
 *
 * @ORM\Entity(repositoryClass="AppBundle\Repository\UserRepository")
 * @UniqueEntity("email")
 * @UniqueEntity("username")
 */
class User implements UserInterface, \Serializable
{
    const ROLE_DEFAULT = 'ROLE_USER';
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;
    /**
     * @Assert\NotBlank(message = "The firstname should not be empty!")
     * @ORM\Column(name="firstname", type="string", length=50)
     * @UserAssert\ContainsLetters
     * @Assert\Length(min=3,
     *     minMessage = "Your firstname must be at least {{ limit }} characters long")
     */
    private $firstname;
    /**
     * @Assert\NotBlank(message = "The lastname should not be empty!")
     * @ORM\Column(name="lastname", type="string", length=50)
     * @UserAssert\ContainsLetters
     * @Assert\Length(min=3,
     *     minMessage = "Your lastname must be at least {{ limit }} characters long")
     */
    private $lastname;
    /**
     * @var string $username
     * @ORM\Column(name="username", type="string", length=255, unique=true)
     * @Assert\NotBlank(message = "The username should not be empty!")
     * @UserAssert\ContainsAlphanumeric
     * @Assert\Length(min=3,
     *     minMessage = "Your username must be at least {{ limit }} characters long")
     */
    private $username;
    /**
     * @var string $email
     * @ORM\Column(name="email", type="string", length=255, unique=true)
     * @Assert\NotBlank(message= "The email should not be empty!")
     * @Assert\Email(
     *     message = "The email '{{ value }}' is not a valid email.",
     *     checkMX = true
     * )
     */
    private $email;
    /**
     * @Assert\NotBlank(message= "The password should not be empty!")
     * @Assert\Length(min=6,
     *     max=2000,
     *     minMessage = "Your password must be at least {{ limit }} characters long"),
     *     maxMessage = "Your password cannot be longer than {{ limit }} characters"
     */
    private $plainPassword;
    /**
     * @var string
     * @ORM\Column(type="string", length=64)
     */
    private $password;
    /**
     * @ORM\Column(name="roles", type="json_array")
     */
    private $roles = [];
    /**
     * @ORM\Column(name="team", type="string", length=50)
     * @Assert\NotBlank(message= "The team should not be empty!")
     * @Assert\Length(min=4,
     *     minMessage = "Your team must be at least {{ limit }} characters long")
     */
    private $team;
    /**
     * @var
     * @OneToMany(targetEntity="AppBundle\Entity\DayOff", mappedBy="user")
     */
    private $daysOff;

    public function __construct()
    {
        $this->setRoles(['ROLE_USER']);
        $this->daysOff = new ArrayCollection();
    }

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
    public function getDaysOff()
    {
        return $this->daysOff;
    }

    /**
     * @param mixed $daysOff
     *
     * @return User
     */
    public function setDaysOff($daysOff)
    {
        $this->daysOff = $daysOff;

        return $this;
    }

    /**
     * Set firstname
     *
     * @param string $firstname
     *
     * @return User
     */
    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;

        return $this;
    }

    /**
     * Get firstname
     *
     * @return string
     */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * Set lastname
     *
     * @param string $lastname
     *
     * @return User
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * Get lastname
     *
     * @return string
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * Set email
     *
     * @param string $email
     *
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    public function getPlainPassword()
    {
        return $this->plainPassword;
    }

    public function setPlainPassword($password)
    {
        $this->plainPassword = $password;
    }

    /**
     * Set password
     *
     * @param string $password
     *
     * @return User
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set team
     *
     * @param string $team
     *
     * @return User
     */
    public function setTeam($team)
    {
        $this->team = $team;

        return $this;
    }

    /**
     * Get team
     *
     * @return string
     */
    public function getTeam()
    {
        return $this->team;
    }

    /**
     * Returns the salt that was originally used to encode the password.
     *
     * This can return null if the password was not encoded using a salt.
     *
     * @return string|null The salt
     */
    public function getSalt()
    {
        return null;
    }

    /**
     * Set username
     *
     * @param string $username
     *
     * @return User
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Returns the username used to authenticate the user.
     *
     * @return string The username
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Removes sensitive data from the user.
     *
     * This is important if, at any given point, sensitive information like
     * the plain-text password is stored on this object.
     */
    public function eraseCredentials()
    {
        // TODO: Implement eraseCredentials() method.
    }

    /**
     * String representation of object
     * @link  http://php.net/manual/en/serializable.serialize.php
     * @return string the string representation of the object or null
     * @since 5.1.0
     */
    public function serialize()
    {
        return serialize(
            [
                $this->id,
                $this->username,
                $this->password,
            ]
        );
    }

    /**
     * Constructs the object
     * @link  http://php.net/manual/en/serializable.unserialize.php
     *
     * @param string $serialized <p>
     *                           The string representation of the object.
     *                           </p>
     *
     * @return void
     * @since 5.1.0
     */
    public function unserialize($serialized)
    {
        list (
            $this->id,
            $this->username,
            $this->password,

            // see section on salt below
            // $this->salt
            ) = unserialize($serialized);
    }

    /**
     * {@inheritdoc}
     */
    public function addRole($role)
    {
        $role = strtoupper($role);
        if ($role === static::ROLE_DEFAULT) {
            return $this;
        }

        if (!in_array($role, $this->roles, true)) {
            $this->roles[] = $role;
        }

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getRoles()
    {
        $roles = $this->roles;

        // we need to make sure to have at least one role
        $roles[] = static::ROLE_DEFAULT;

        return array_unique($roles);
    }

    /**
     * {@inheritdoc}
     */
    public function removeRole($role)
    {
        if (false !== $key = array_search(strtoupper($role), $this->roles, true)) {
            unset($this->roles[$key]);
            $this->roles = array_values($this->roles);
        }

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function setRoles(array $roles)
    {
        $this->roles = [];

        foreach ($roles as $role) {
            $this->addRole($role);
        }

        return $this;
    }
}

