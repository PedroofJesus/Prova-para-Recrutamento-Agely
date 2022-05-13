function calculaMedias(thirdResponse) {
    let numPessoasCovid = 0;
    let numPessoasSemCovid = 0;
    let numPessoasVacinadas = 0;
    let somaIdadesPessoasCovid = 0;
    let somaIdadePessoasSemCovid = 0;
    let idadePessoaMaisJovem = 100000;
    let idadePessoaMaisVelha = 0;
    let teveSemVac = 0;
    let teveComVac = 0;
    let somaDoses = 0;
    thirdResponse.data.dados.forEach(pessoa => {
      if (pessoa.teveCovid === true) {
        numPessoasCovid++;
        somaIdadesPessoasCovid += pessoa.idade;
      }
      else {
        numPessoasSemCovid++;
        somaIdadePessoasSemCovid += pessoa.idade;
      }
      if (pessoa.doses === 3) {
        idadePessoaMaisJovem = Math.min(pessoa.idade, idadePessoaMaisJovem);
        idadePessoaMaisVelha = Math.max(pessoa.idade, idadePessoaMaisVelha);
      }
  
      if (pessoa.teveCovid === true) {
  
        if (pessoa.doses === 0) {
          teveSemVac++;
        }
        else {
          teveComVac++;
        }
        
      }
      if(pessoa.doses != 0) {
        numPessoasVacinadas++;
        somaDoses += pessoa.doses;
      }
  
    });
    return { somaIdadesPessoasCovid, numPessoasCovid, somaIdadePessoasSemCovid, numPessoasSemCovid, idadePessoaMaisJovem, idadePessoaMaisVelha, teveSemVac, teveComVac, numPessoasVacinadas, somaDoses };
}

module.exports = calculaMedias