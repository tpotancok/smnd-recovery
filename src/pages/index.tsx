import { Inter } from "next/font/google";
import { useCallback, useState } from "react";
import Dropzone from "react-dropzone";
import FileChip from "@/components/FileChip";
import { Dropdown } from "@/components/Dropdown";
import axios from "axios";
import Head from "next/head";
import { UploadingModal } from "@/components/UploadingModal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loading, setLoading] = useState(false);

  const [files, setFiles] = useState<File[]>([]);

  const [material, setMaterial] = useState("");
  const [teacher, setTeacher] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (files.length + acceptedFiles.length > 8) {
      alert("Maximálny počet súborov je 8");
      return;
    }
    if (files.some((file) => acceptedFiles.some((f) => f.name === file.name))) {
      alert("Súbor s rovnakým menom už bol pridaný");
      return;
    }
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    if (files.length === 0) {
      alert("Nahrajte aspoň jeden súbor");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        material,
        teacher,
        subject,
        year,
        files: files.map((file) => {
          return {
            name: file.name,
            type: file.type,
          };
        }),
      }),
    });

    if (res.status === 200) {
      const body = await res.json();
      const { signedUrls } = body;

      const promises = files.map((file, i) => {
        return axios.put(signedUrls[i], file, {
          headers: {
            "Content-Type": file.type,
            "Access-Control-Allow-Origin": "*",
          },
        });
      });

      await Promise.all(promises);
      alert("Úspešne odoslané");
      setMaterial("");
      setTeacher("");
      setSubject("");
      setYear("");
      setFiles([]);
    } else {
      alert("Nastala chyba pri odosielaní. Prosím skúste to neskôr.");
    }

    setLoading(false);
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center px-5 py-12 md:py-24 ${inter.className}`}>
      <Head>
        <title>SMND Obnova</title>
        <meta name="description" content="Obnova edukačných materiálov" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {loading && <UploadingModal />}

      <h1 className="text-center text-3xl font-bold">Obnova edukačných materiálov</h1>
      <p className="mt-1 w-full text-center text-sm leading-6 text-gray-600 md:w-2/3 lg:w-1/3">
        V dôsledku vyhorenia zborovne sa stratila vysoká kvantita edukačných materiálov. Ak by ste
        si našli chvíľku, aby ste nám pomohli s obnovou, boli by sme veľmi vďační.
      </p>

      <form className="w-full max-w-3xl" onSubmit={onSubmit}>
        <div className="w-full border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-y-4 md:grid-cols-6 md:gap-x-6 md:gap-y-8 ">
            {/* Material name */}
            <div className="col-span-full">
              <label htmlFor="material" className="label-base">
                Meno materiálu
                <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                type="text"
                id="material"
                name="material"
                required
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="input-base mt-2"
              />
            </div>

            {/* Teacher */}
            <Dropdown
              name="teacher"
              label="Meno učiteľa"
              placeholder="Vyberte učiteľa"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              className="col-span-2">
              <option value="Babka Ticián">Babka Ticián</option>
              <option value="Bartošová Zuzana">Bartošová Zuzana</option>
              <option value="Baur James Andrew">Baur James Andrew</option>
              <option value="Belan Anton">Belan Anton</option>
              <option value="Besedová Žegorjaková Jana">Besedová Žegorjaková Jana</option>
              <option value="Bujňák Milan">Bujňák Milan</option>
              <option value="Bujtárová Beáta">Bujtárová Beáta</option>
              <option value="Chudík Roman">Chudík Roman</option>
              <option value="Chudíková Iveta">Chudíková Iveta</option>
              <option value="Cimra Jozef Doddy">Cimra Jozef Doddy</option>
              <option value="Cimrová Martina">Cimrová Martina</option>
              <option value="Dzama Dávid">Dzama Dávid</option>
              <option value="Gancarčíková Zlatica">Gancarčíková Zlatica</option>
              <option value="Gočárová Katarína">Gočárová Katarína</option>
              <option value="Grejtáková Monika">Grejtáková Monika</option>
              <option value="Hasalíková Zuzana">Hasalíková Zuzana</option>
              <option value="Habľáková Martina">Habľáková Martina</option>
              <option value="Hladká Ľudmila">Hladká Ľudmila</option>
              <option value="Hlinková Danica">Hlinková Danica</option>
              <option value="Husarovičová Iveta">Husarovičová Iveta</option>
              <option value="Iváneková Ivona">Iváneková Ivona</option>
              <option value="Janáčková Marianna">Janáčková Marianna</option>
              <option value="Janičová Monika">Janičová Monika</option>
              <option value="Jankovičová Lenka">Jankovičová Lenka</option>
              <option value="Jánošková Viera">Jánošková Viera</option>
              <option value="Jurík Andrej">Jurík Andrej</option>
              <option value="Kárászová Viktória">Kárászová Viktória</option>
              <option value="Karšňáková Katarína">Karšňáková Katarína</option>
              <option value="Kažimírová Anna">Kažimírová Anna</option>
              <option value="Kelbelová Lenka">Kelbelová Lenka</option>
              <option value="Kneiszová Emília">Kneiszová Emília</option>
              <option value="Kolibárová Marta">Kolibárová Marta</option>
              <option value="Kostolanská Veronika">Kostolanská Veronika</option>
              <option value="Košová Simona">Košová Simona</option>
              <option value="Kováč Martin">Kováč Martin</option>
              <option value="Kováčová Ivona">Kováčová Ivona</option>
              <option value="Kováčová Silvia">Kováčová Silvia</option>
              <option value="Krchňavý Jakub">Krchňavý Jakub</option>
              <option value="Kučerová Katarína">Kučerová Katarína</option>
              <option value="Laznibatová Jolana">Laznibatová Jolana</option>
              <option value="Marcinková Denisa">Marcinková Denisa</option>
              <option value="Mariašová Magdaléna">Mariašová Magdaléna</option>
              <option value="Masaryková Katarína">Masaryková Katarína</option>
              <option value="Matejov Radoslav">Matejov Radoslav</option>
              <option value="Medrický Michal">Medrický Michal</option>
              <option value="Melicherčíková Mária">Melicherčíková Mária</option>
              <option value="Murínová Jana">Murínová Jana</option>
              <option value="Ondriašová Dominika">Ondriašová Dominika</option>
              <option value="Pajtíková Katarína">Pajtíková Katarína</option>
              <option value="Pindurová Andrea">Pindurová Andrea</option>
              <option value="Poljovka Juraj">Poljovka Juraj</option>
              <option value="Pupíková Katarína">Pupíková Katarína</option>
              <option value="Račevová Jela">Račevová Jela</option>
              <option value="Ralbovský Jozef">Ralbovský Jozef</option>
              <option value="Rohaľová Andrea">Rohaľová Andrea</option>
              <option value="Sedmákova Renáta">Sedmákova Renáta</option>
              <option value="Slezáková Nina">Slezáková Nina</option>
              <option value="Staňo Marián">Staňo Marián</option>
              <option value="Šikulíncová Lenka">Šikulíncová Lenka</option>
              <option value="Šramová Katarína">Šramová Katarína</option>
              <option value="Tomková Martina">Tomková Martina</option>
              <option value="Valentová Mária">Valentová Mária</option>
              <option value="Vašicová Lenka">Vašicová Lenka</option>
              <option value="Vráblová Lenka">Vráblová Lenka</option>
              <option value="Wildová Elena">Wildová Elena</option>
              <option value="Zuzkovičová Katarína">Zuzkovičová Katarína</option>
              <option value="other">Iné (vložte do mena materiálu)</option>
            </Dropdown>

            {/* Class */}
            <Dropdown
              name="year"
              label="Ročník"
              placeholder="Vyberte ročník"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="col-span-2">
              <option value="5">5. ročník</option>
              <option value="prima">Prima</option>
              <option value="sekunda">Sekunda</option>
              <option value="tercia">Tercia</option>
              <option value="kvarta">Kvarta</option>
              <option value="kvinta">Kvinta</option>
              <option value="sexta">Sexta</option>
              <option value="septima">Septima</option>
              <option value="oktava">Oktáva</option>
              <option value="other">Iné (vložte do mena materiálu)</option>
            </Dropdown>

            {/* Subject */}
            <Dropdown
              name="subject"
              label="Predmet"
              placeholder="Vyberte predmet"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="col-span-2">
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
              <option value="GZC">Grafika, žurnalistika a marketing školského časopisu</option>
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
              <option value="SJL">Slovenčina</option>
              <option value="SVS">Spoločensko-vedný seminár</option>
              <option value="SJA">Španielčina</option>
              <option value="TECH">Technika</option>
              <option value="TvP">Technika v praxi</option>
              <option value="UaK">Umenie a Kultúra</option>
              <option value="VYV">Výtvarná výchova</option>
              <option value="other">Iné (vložte do mena materiálu)</option>
            </Dropdown>

            {/* File Input */}
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div
                  className="col-span-full mt-2 flex flex-col items-center rounded-lg border border-dashed border-gray-900/25 py-14"
                  {...getRootProps()}>
                  <div className="mx-auto flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="files"
                      className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500">
                      <span>Vyberte súbory</span>
                      <input {...getInputProps()} />
                    </label>
                    <p className="pl-1">alebo ich sem presuňte</p>
                  </div>

                  {files.length > 0 && (
                    <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                      {files.map((file, index) => (
                        <FileChip
                          file={file}
                          key={index}
                          onDelete={(e) => {
                            e.stopPropagation();
                            const newFiles = files.filter((_, i) => i !== index);
                            setFiles(newFiles);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-600">
            Made with ❤️ by{" "}
            <a className="font-bold text-indigo-600" href="https://www.linkedin.com/in/vdemcak/">
              Viktor Demčák
            </a>
            {" - "}
            <a className="font-bold" href="https://github.com/vdemcak/smnd-recovery">
              Contribute
            </a>
          </span>
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            {loading ? "Nahrávam..." : "Odoslať"}
          </button>
        </div>
      </form>
    </main>
  );
}
