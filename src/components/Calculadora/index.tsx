import { useState } from 'react';
import styles from './Calculadora.module.scss';

export default function Calculadora() {
  const [output, setOutput] = useState<string>('');

  const teclado: Array<string | number>[] = [
    ['CE', 'C', 'apagar'],
    [7, 8, 9, 'x'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, ',', '='],
  ];

  let contador = 1;

  const [numero1, setNumero1] = useState<string>('');
  const [numero2, setNumero2] = useState<string>('');
  const [operacao, setOperacao] = useState<'+' | '-' | 'x'>();

  function handleClick(item: string | number) {
    let numero = '';
    numero = String(operacao === undefined ? numero1 : numero2);
    if (typeof item === 'number' || item === ',') {
      numero += item;
    } else if (item === '+' || item === '-' || item === 'x') {
      operacao !== undefined && setNumero2('');
      setOperacao(item);
      return;
    } else if (item === 'CE' || item === 'C' || item === 'apagar') {
      if (item === 'apagar') {
        numero = numero.substring(0, numero.length - 1);
      } else if (item === 'CE') {
        operacao === undefined ? setNumero1('') : setNumero2('');
        setOutput('');
        return;
      } else if (item === 'C') {
        setNumero1('');
        setNumero2('');
        setOperacao(undefined);
        setOutput('');
        return;
      }
    } else if (item === '=' && operacao) {
      let numeroOperacao1 = Number(numero1.replace(',', '.'));
      let numeroOperacao2 = Number(numero2.replace(',', '.'));
      let resultado = String(operacaoMatematica(numeroOperacao1, operacao, numeroOperacao2)).replace('.', ',');
      setOutput(resultado);
      setNumero1(resultado);
      return;
    }
    operacao === undefined ? setNumero1(numero) : setNumero2(numero);
    setOutput(numero);
  }

  function operacaoMatematica(
    numeroOperacao1: number,
    operacao: '+' | '-' | 'x',
    numeroOperacao2: number
  ) {
    let resultado = 0;
    operacao === '+' && (resultado = numeroOperacao1 + numeroOperacao2);
    operacao === '-' && (resultado = numeroOperacao1 - numeroOperacao2);
    operacao === 'x' && (resultado = numeroOperacao1 * numeroOperacao2);
    return resultado;
  }

  return (
    <div className={styles.calculadoraDiv}>
      <div className={styles.calculadora}>
        <p className={styles.calculadora__output}>
          {output.length < 1 ? '0' : output}
        </p>
        {teclado.map((linha) =>
          linha.map((item, indexB) => (
            <button
              key={indexB}
              className={`${styles[`item${contador++}`]} ${styles.botao}`}
              onClick={() => {
                handleClick(item);
              }}
            >
              {item}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
