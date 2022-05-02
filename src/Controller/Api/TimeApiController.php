<?php

namespace App\Controller\Api;

use App\Entity\Times;
use App\Form\TimeType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizableInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

#[Route("/temps")]
class TimeApiController extends AbstractController
{
    #[Route('/ajouter', name: 'time.create')]
    public function add(Request $request, EntityManagerInterface $em) : JsonResponse
    {
        $time = new Times();
        $form = $this->createForm(TimeType::class,$time);

        if($content = $request->getContent()) {
            $datas = json_decode($content, true);
        }

        $form->submit($datas);

        if($form->isValid()) {
            try{
                $time->setPartyDate(new \DateTime('now'));
                $em->persist($time);
                $em->flush();
                return new JsonResponse(['status' => 'ok']);
            }catch(\Exception $e) {
                return new JsonResponse(['status' => 'ko', 'errors' => $e->getMessage()]);
            }

        } else {
            $errors = [];
            foreach($form->getErrors() as $key => $error) {
                $errors[] = 'champ ' . $key . ' ' . $error->getMessage();
            }
            return new JsonResponse(['status' => 'ko', 'errors' => $errors]);
        }
    }

    #[Route("/liste", name: 'time.list')]
    public function list(NormalizerInterface $normalizer, EntityManagerInterface $em)
    {
        $times = $em->getRepository(Times::class)->findBy([],['duration' => 'ASC']);
        $datas = $normalizer->normalize($times,'json',['groups' => ['simpleTime'], 'datetime_format' => 'd/m/Y']);
        return new JsonResponse($datas);
    }
}
