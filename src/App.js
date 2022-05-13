import React, { useEffect, useState } from "react";
import api from "./services/api";
import calculaMedias from "./services/medias";

export default function App() {
  const [pessoas = [], setPessoas] = useState();
  const [media, setMedia] = useState();
  const [media1, setMedia1] = useState();
  const [media2, setMedia2] = useState();
  const [idadeMa, setIdadeMa] = useState();
  const [idadeMe, setIdadeMe] = useState();
  const [percSV, setPercSV] = useState();
  const [percCV, setPercCV] = useState();


  useEffect(() => {
    api("/covid?service=uf&filter=mg", { crossdomain: true })
      .then((response) => api.get("/covid?service=cidade&filter=passos&hash=" + response.data.hash).then(secondResponse =>
        api.get("/covid?service=dados&hash=" + secondResponse.data.hash).then(thirdResponse => {

          setPessoas(thirdResponse.data.dados);
          let medias = calculaMedias(thirdResponse, setPessoas);


          setPessoas(thirdResponse.data.dados);
          setMedia1(Math.round(medias.somaIdadesPessoasCovid / medias.numPessoasCovid));
          setMedia2(Math.round(medias.somaIdadePessoasSemCovid / medias.numPessoasSemCovid));
          setIdadeMe(medias.idadePessoaMaisJovem);
          setIdadeMa(medias.idadePessoaMaisVelha);
          setPercSV(Math.round(medias.teveSemVac % medias.numPessoasCovid));
          setPercCV(Math.round(medias.teveComVac % medias.numPessoasCovid));
          setMedia(Math.round(medias.somaDoses /medias.numPessoasVacinadas));
        })
      ))
  });


  return (
    <div className="tab1">

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Doses</th>
            <th>Teve Covid</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map(item => {
            return (
              <tr key={item.doses}>
                <td>{item.nome}</td>
                <td>{item.idade}</td>
                <td>{item.doses}</td>
                <td>{item.teveCovid ? 'Sim' : 'Não'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p>Média de idade de pessoas com covid: {media1}</p>
      <p>Média de idade de pessoas sem covid: {media2}</p>
      <p>Idade da pessoa mais jovem que tomou as 3 doses da vacina: {idadeMe}</p>
      <p>Idade da pessoa mais velha que tomou as 3 doses da vacina: {idadeMa}</p>
      <p>Porcentagem de pessoas que tiveram covid sem tomar nenhuma dose da vacina: {percSV}</p>
      <p>Porcentagem de pessoas que tiveram covid sem tomar nenhuma dose da vacina: {percCV}</p>
      <p>Média de doses por pessoas: {media}</p>

    </div>
  );
}