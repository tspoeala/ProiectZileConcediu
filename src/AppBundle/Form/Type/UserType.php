<?php

namespace AppBundle\Form\Type;

use AppBundle\Controller\UserController;
use AppBundle\Entity\Team;
use AppBundle\Entity\User;
use AppBundle\Repository\TeamRepository;
use AppBundle\Repository\UserRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
{
    private $teams;

    public function __construct(TeamRepository $repository)
    {
        $teams = $repository->getAll();
        $this->teams[''] = '';
        foreach ($teams as $team) {
            $this->teams[ucfirst($team->getName())] = $team->getName();
        }
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('firstname', TextType::class)
            ->add('lastname', TextType::class)
            ->add('email', EmailType::class)
            ->add('team', ChoiceType::class, [
                'choices' => $this->teams,
            ])
            ->add('username', TextType::class)
            ->add('plainPassword', RepeatedType::class, [
                'invalid_message' => 'The password fields must match.',
                'type' => PasswordType::class,
                'first_options' => ['label' => 'Password'],
                'second_options' => ['label' => 'Repeat Password'],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }

    public function getName()
    {
        return 'user';
    }
}