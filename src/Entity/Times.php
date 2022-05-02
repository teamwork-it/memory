<?php

namespace App\Entity;

use App\Repository\TimesRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TimesRepository::class)]
class Times
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'datetime')]
    #[Groups("simpleTime")]
    private $partyDate;

    #[ORM\Column(type: 'integer')]
    #[Groups("simpleTime")]
    private $duration;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPartyDate(): ?\DateTimeInterface
    {
        return $this->partyDate;
    }

    public function setPartyDate(\DateTimeInterface $partyDate): self
    {
        $this->partyDate = $partyDate;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): self
    {
        $this->duration = $duration;

        return $this;
    }
}
