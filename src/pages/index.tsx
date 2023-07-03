import Image from "next/image";
import { Inter } from "next/font/google";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const inter = Inter({ subsets: ["latin"] });

const fileTypes = ["JPG", "PNG", "GIF", "TXT", "DOCX", "PPTX"];

export default function Home() {
  const [file, setFile] = useState(null);

  const handleChange = (file: any) => {
    setFile(file);
  };

  return (
    <main
      className={`mt-24 flex min-h-screen flex-col items-center px-5 ${inter.className}`}>
      <h1 className="text-center text-3xl font-bold">
        Obnova edukačných materiálov
      </h1>
      <p className="mt-1 w-full text-center text-sm leading-6 text-gray-600 md:w-1/3">
        V dôsledku vyhorenia zborovne sa stratila vysoká kvantita edukačných
        materiálov. Ak by ste si našli chvíľku, aby ste nám pomohli s obnovou,
        boli by sme veľmi vďační.
      </p>
      <form className="w-full max-w-3xl" action="/api/submit" method="POST">
        <div className="w-full border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
            {/* Material name */}
            <div className="col-span-full">
              <label htmlFor="material" className="label-base">
                Meno materiálu
              </label>
              <input
                id="material"
                type="text"
                name="material"
                className="input-base mt-2"
              />
            </div>

            {/* Teacher */}
            <div className="sm:col-span-2">
              <label htmlFor="teacher" className="label-base">
                Meno učiteľa
              </label>
              <select
                id="teacher"
                name="teacher"
                className="input-base mt-2"
                defaultValue="">
                <option disabled value="">
                  Vyberte učiteľa
                </option>
                <option value="Babka Ticián">Babka Ticián</option>
                <option value="Bartošová Zuzana">Bartošová Zuzana</option>
                <option value="Baur James Andrew">Baur James Andrew</option>
                <option value="Belan Anton">Belan Anton</option>
                <option value="Besedová Žegorjaková Jana">
                  Besedová Žegorjaková Jana
                </option>
                <option value="Bujňák Milan">Bujňák Milan</option>
                <option value="Bujtárová Beáta">Bujtárová Beáta</option>
                <option value="Cimra Jozef Doddy">Cimra Jozef Doddy</option>
                <option value="Cimrová Martina">Cimrová Martina</option>
                <option value="Dzama Dávid">Dzama Dávid</option>
                <option value="Grejtáková Monika">Grejtáková Monika</option>
                <option value="Hasalíková Zuzana">Hasalíková Zuzana</option>
                <option value="Hladká Ľudmila">Hladká Ľudmila</option>
                <option value="Hlinková Danica">Hlinková Danica</option>
                <option value="Iváneková Ivona">Iváneková Ivona</option>
                <option value="Janičová Monika">Janičová Monika</option>
                <option value="Jankovičová Lenka">Jankovičová Lenka</option>
                <option value="Jánošková Viera">Jánošková Viera</option>
                <option value="Jurík Andrej">Jurík Andrej</option>
                <option value="Kárászová Viktória">Kárászová Viktória</option>
                <option value="Karšňáková Katarína">Karšňáková Katarína</option>
                <option value="Kažimírová Anna">Kažimírová Anna</option>
                <option value="Kelbelová Lenka">Kelbelová Lenka</option>
                <option value="Kolibárová Marta">Kolibárová Marta</option>
                <option value="Košová Simona">Košová Simona</option>
                <option value="Kováč Martin">Kováč Martin</option>
                <option value="Kováčová Silvia">Kováčová Silvia</option>
                <option value="Krchňavý Jakub">Krchňavý Jakub</option>
                <option value="Kučerová Katarína">Kučerová Katarína</option>
                <option value="Laznibatová Jolana">Laznibatová Jolana</option>
                <option value="Marcinková Denisa">Marcinková Denisa</option>
                <option value="Masaryková Katarína">Masaryková Katarína</option>
                <option value="Matejov Radoslav">Matejov Radoslav</option>
                <option value="Medrický Michal">Medrický Michal</option>
                <option value="Melicherčíková Mária">
                  Melicherčíková Mária
                </option>
                <option value="Murínová Jana">Murínová Jana</option>
                <option value="Ondriašová Dominika">Ondriašová Dominika</option>
                <option value="Pajtíková Katarína">Pajtíková Katarína</option>
                <option value="Pindurová Andrea">Pindurová Andrea</option>
                <option value="Poljovka Juraj">Poljovka Juraj</option>
                <option value="Pupíková Katarína">Pupíková Katarína</option>
                <option value="Račevová Jela">Račevová Jela</option>
                <option value="Rohaľová Andrea">Rohaľová Andrea</option>
                <option value="Sedmákova Renáta">Sedmákova Renáta</option>
                <option value="Slezáková Nina">Slezáková Nina</option>
                <option value="Staňo Marián">Staňo Marián</option>
                <option value="Šramová Katarína">Šramová Katarína</option>
                <option value="Tomková Martina">Tomková Martina</option>
                <option value="Valentová Mária">Valentová Mária</option>
                <option value="Vašicová Lenka">Vašicová Lenka</option>
                <option value="Vráblová Lenka">Vráblová Lenka</option>
                <option value="Zuzkovičová Katarína">
                  Zuzkovičová Katarína
                </option>
                <option value="Gancarčíková Zlatica">
                  Gancarčíková Zlatica
                </option>
                <option value="Gočárová Katarína">Gočárová Katarína</option>
                <option value="Habľáková Martina">Habľáková Martina</option>
                <option value="Husarovičová Iveta">Husarovičová Iveta</option>
                <option value="Chudík Roman">Chudík Roman</option>
                <option value="Chudíková Iveta">Chudíková Iveta</option>
                <option value="Janáčková Marianna">Janáčková Marianna</option>
                <option value="Kneiszová Emília">Kneiszová Emília</option>
                <option value="Kostolanská Veronika">
                  Kostolanská Veronika
                </option>
                <option value="Kováčová Ivona">Kováčová Ivona</option>
                <option value="Mariašová Magdaléna">Mariašová Magdaléna</option>
                <option value="Ralbovský Jozef">Ralbovský Jozef</option>
                <option value="Šikulíncová Lenka">Šikulíncová Lenka</option>
                <option value="Wildová Elena">Wildová Elena</option>
                <option value="other">Iné (vložte do mena materiálu)</option>
              </select>
            </div>

            {/* Class */}
            <div className="sm:col-span-2">
              <label htmlFor="class" className="label-base">
                Ročník
              </label>
              <select
                id="class"
                name="class"
                className="input-base mt-2"
                defaultValue="">
                <option value="" disabled>
                  Vyberte ročník
                </option>
                <option value="5">5. Ročník</option>
                <option value="prima">Prima</option>
                <option value="sekunda">Sekunda</option>
                <option value="tercia">Tercia</option>
                <option value="kvarta">Kvarta</option>
                <option value="kvinta">Kvinta</option>
                <option value="sexta">Sexta</option>
                <option value="septima">Septima</option>
                <option value="oktava">Oktáva</option>
                <option value="other">Iné (vložte do mena materiálu)</option>
              </select>
            </div>

            {/* Subject */}
            <div className="sm:col-span-2">
              <label htmlFor="subject" className="label-base">
                Predmet
              </label>
              <select
                id="subject"
                name="subject"
                className="input-base mt-2"
                defaultValue="">
                <option disabled value="">
                  Vyberte predmet
                </option>
                <option value="ANJ">Angličtina</option>
                <option value="ANL">Anglická literatúra</option>
                <option value="BIO">Biológia</option>
                <option value="CHE">Chémia</option>
                <option value="cBIO">Cvičenia z biológie</option>
                <option value="cCHE">Cvičenia z chémie</option>
                <option value="cFYZ">Cvičenia z fyziky</option>
                <option value="cGEG">Cvičenia z geografie</option>
                <option value="cMAT">Cvičenia z matematiky</option>
                <option value="DES">Debatný seminár</option>
                <option value="DEJ">Dejepis</option>
                <option value="DEU">Dejiny umenia</option>
                <option value="EFI">Ekonomika, financie a investovanie</option>
                <option value="ETV">Etická výchova</option>
                <option value="EVN">Evanjelické náboženstvo</option>
                <option value="FIG">Finančná gramotnosť</option>
                <option value="FYZ">Fyzika</option>
                <option value="FyV">Fyzikálne výpočty</option>
                <option value="GEG">Geografia</option>
                <option value="GZC">
                  Grafika, žurnalistika a marketing školského časopisu
                </option>
                <option value="HUV">Hudobná výchova</option>
                <option value="INF">Informatika</option>
                <option value="KAJ">Konverzácia v angličitne</option>
                <option value="KNJ">Konverzácia v nemčine</option>
                <option value="MAT">Matematika</option>
                <option value="NAB">Náboženstvo</option>
                <option value="NEJ">Nemčina</option>
                <option value="OBN">Občianska náuka</option>
                <option value="PMO">Príprava na matematickú olympiádu</option>
                <option value="PRO">Programovanie</option>
                <option value="PSE">Projektový seminár</option>
                <option value="PSY">Psychológia</option>
                <option value="RET">Rétorika</option>
                <option value="RUS">Ruština</option>
                <option value="sBIO">Seminár z biológie</option>
                <option value="sCHE">Seminár z chémie</option>
                <option value="sDEJ">Seminár z dejepisu</option>
                <option value="sEKO">Seminár z ekonómie</option>
                <option value="sFYZ">Seminár z fyziky</option>
                <option value="sGEG">Seminár z geografie</option>
                <option value="sINF">Seminár z informatiky</option>
                <option value="sMAT">Seminár z matematiky</option>
                <option value="sNEJ">Seminár z nemčiny</option>
                <option value="sSJL">Seminár zo slovenčiny</option>
                <option value="sSJA">Seminár zo španielčiny</option>
                <option value="SVS">Spoločensko-vedný seminár</option>
                <option value="SJA">Španielčina</option>
                <option value="TECH">Technika</option>
                <option value="TvP">Technika v praxi</option>
                <option value="UaK">Umenie a Kultúra</option>
                <option value="VYV">Výtvarná výchova</option>
                <option value="other">Iné (vložte do mena materiálu)</option>
              </select>
            </div>

            {/* File Input */}
            <div className="col-span-full mt-2 flex flex-col items-center rounded-lg border border-dashed border-gray-900/25 py-10">
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mx-auto mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500">
                  <span>Vyberte súbor</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">alebo ho sem presuňte</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                {fileTypes.join(", ")} do 30MB
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-end">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            Odoslať
          </button>
        </div>
      </form>
    </main>
  );
}
