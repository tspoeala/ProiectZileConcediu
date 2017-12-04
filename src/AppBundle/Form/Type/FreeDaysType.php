<?php

namespace AppBundle\Form\Type;

use AppBundle\Entity\FreeDays;
use Doctrine\DBAL\Types\TextType;
use function Sodium\add;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class FreeDaysType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('date', DateType ::class, ['label' => false])
            ->add('name', TextType::class);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => FreeDays::class,
        ]);
    }

    public function getName()
    {
        return 'free_days';
    }
}