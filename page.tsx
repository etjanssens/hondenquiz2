"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const hondenrassen = [
  "Akita Inu", "Appenzeller", "Beagle", "Berner Sennen", "Bichon Frisé", "Border Collie",
  "Boston Terriër", "Chihuahua", "Cocker Spaniël", "Dalmatiër", "Dobermann", "Duitse Dog",
  "Duitse Herder", "Engelse Bulldog", "Franse Bulldog", "Golden Retriever", "Husky",
  "Jack Russel", "Labrador", "Maltezer", "Poedel", "Rottweiler", "Shetland Sheepdog",
  "Shih Tzu", "Sint Bernard", "Staffordshire Bull Terriër", "Teckel", "Whippet"
];

const rasToBestand = {
  "Akita Inu": "akitainu.jpg",
  "Appenzeller": "appenzeller.jpeg",
  "Beagle": "beagle.jpeg",
  "Berner Sennen": "bernersennen.jpg",
  "Bichon Frisé": "bichonfrise.jpg",
  "Border Collie": "bordercollie.jpg",
  "Boston Terriër": "bostonterrier.jpeg",
  "Chihuahua": "chihuahua.jpg",
  "Cocker Spaniël": "cockerspaniel.jpg",
  "Dalmatiër": "dalmatier.jpg",
  "Dobermann": "dobermann.jpg",
  "Duitse Dog": "duitsedog.jpg",
  "Duitse Herder": "duitseherder.jpeg",
  "Engelse Bulldog": "engelsebulldog.jpg",
  "Franse Bulldog": "fransebulldog.jpeg",
  "Golden Retriever": "goldenretriever.jpg",
  "Husky": "husky.jpg",
  "Jack Russel": "jackrussel.jpg",
  "Labrador": "labrador.jpg",
  "Maltezer": "maltezer.jpg",
  "Poedel": "poedel.jpg",
  "Rottweiler": "rottweiler.jpg",
  "Shetland Sheepdog": "shetlandsheepdog.jpeg",
  "Shih Tzu": "shitzu.jpeg",
  "Sint Bernard": "sintbernard.jpg",
  "Staffordshire Bull Terriër": "staffordshirebulterrier.jpg",
  "Teckel": "teckel.jpg",
  "Whippet": "whippet.jpg"
};

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default function Hondenquiz() {
  const [vragen, setVragen] = useState([]);
  const [antwoorden, setAntwoorden] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const gekozenRassen = shuffle(hondenrassen).slice(0, 10);
    const vragen = gekozenRassen.map((ras, index) => ({
      id: index,
      juist: ras,
      afbeelding: "/honden/" + (rasToBestand[ras] || "placeholder.jpg")
    }));
    setVragen(vragen);
  }, []);

  const handleChange = (id, value) => {
    setAntwoorden({ ...antwoorden, [id]: value });
  };

  const checkScore = () => {
    let punten = 0;
    vragen.forEach(vraag => {
      if ((antwoorden[vraag.id] || "").toLowerCase().trim() === vraag.juist.toLowerCase()) {
        punten++;
      }
    });
    setScore(punten);
    navigator.clipboard.writeText(`Ik haalde ${punten}/10 in de hondenrassenquiz! 🐶`);
  };

  const opnieuw = () => {
    setScore(null);
    setAntwoorden({});
    const gekozenRassen = shuffle(hondenrassen).slice(0, 10);
    const vragen = gekozenRassen.map((ras, index) => ({
      id: index,
      juist: ras,
      afbeelding: "/honden/" + (rasToBestand[ras] || "placeholder.jpg")
    }));
    setVragen(vragen);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🐶 Raad het hondenras</h1>
      {score === null ? (
        <>
          {vragen.map((vraag, idx) => (
            <Card key={vraag.id} className="mb-4">
              <CardContent className="p-4">
                <div className="mb-2 font-semibold">Vraag {idx + 1} van 10</div>
                <img src={vraag.afbeelding} alt="hond" className="mb-2 w-full rounded" />
                <Input
                  type="text"
                  placeholder="Typ het ras..."
                  list={`rassen-${vraag.id}`}
                  value={antwoorden[vraag.id] || ""}
                  onChange={e => handleChange(vraag.id, e.target.value)}
                />
                <datalist id={`rassen-${vraag.id}`}>
                  {hondenrassen.map((ras, i) => (
                    <option key={i} value={ras} />
                  ))}
                </datalist>
              </CardContent>
            </Card>
          ))}
          <Button onClick={checkScore} className="w-full">Controleer antwoorden</Button>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">🎉 Je haalde {score}/10 goed!</h2>
          <Button onClick={opnieuw} className="mr-2">Probeer opnieuw</Button>
          <Button
            onClick={() => navigator.clipboard.writeText(`Ik haalde ${score}/10 in de hondenrassenquiz! 🐶`)}
            variant="outline"
          >
            Deel jouw score
          </Button>
        </div>
      )}
    </div>
  );
}
