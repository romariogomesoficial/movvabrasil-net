// /llms.txt — o índice do site para sistemas de IA.
//
// GERADO no build, a partir da coleção de posts e de src/data/site.js. Antes
// era um arquivo escrito à mão em public/, e ficou defasado no dia em que o
// blog passou de 1 para 8 posts: listava 4 páginas e nenhum texto. Um arquivo
// que existe para dizer o que o site contém não pode depender de alguém
// lembrar de atualizá-lo.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, AUTOR, VINCULO, EMPRESA } from '../data/site.js';
import { ROTULO_DO_CLUSTER } from '../data/clusters.js';
import { PAGINAS } from '../data/paginas.js';

export const prerender = true;

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.publicado.valueOf() - a.data.publicado.valueOf()
  );

  const porCluster = new Map<string, typeof posts>();
  for (const p of posts) {
    const lista = porCluster.get(p.data.cluster) ?? [];
    lista.push(p);
    porCluster.set(p.data.cluster, lista);
  }

  // A lista de páginas vem de src/data/paginas.js, não escrita aqui: foi
  // escrita aqui uma vez e, no dia em que três páginas novas entraram, este
  // arquivo não soube de nenhuma delas.
  const listaDePaginas = PAGINAS.map((p) => {
    const resumo = p.path === '/blog' ? `${p.resumo} São ${posts.length} textos.` : p.resumo;
    return `- [${p.rotulo}](${SITE.url}${p.path === '/' ? '' : p.path}): ${resumo}`;
  }).join('\n');

  const secoesDeBlog = [...porCluster.entries()]
    .map(([cluster, lista]) => {
      const itens = lista
        .map(
          (p) =>
            `- [${p.data.title}](${SITE.url}/blog/${p.id}): ${p.data.description}\n  Resposta curta: ${p.data.resposta}`
        )
        .join('\n');
      return `### ${ROTULO_DO_CLUSTER[cluster] ?? cluster}\n\n${itens}`;
    })
    .join('\n\n');

  const texto = `# ${SITE.name}

> Site de distribuidor independente da ${EMPRESA.razaoSocial}, operadora móvel
> virtual brasileira. Não é canal oficial da empresa. Publica análise verificável
> sobre a operadora, conteúdo prático sobre planos de celular, portabilidade e
> cobertura, e os números reais de ganho do autor como afiliado, incluindo os
> resultados ruins.

Autor: ${AUTOR.nome}, ${AUTOR.papel}.
Vínculo: ${VINCULO}
Idioma: português do Brasil.

## Política editorial

Toda afirmação factual traz fonte primária linkada, com a data da checagem. O que
não foi confirmado é marcado como não confirmado, com indicação de onde o leitor
confirma — inclusive quando isso enfraquece o texto. Característica de produto da
MOVVA é sempre atribuída à empresa, nunca afirmada: o autor contratou o plano, o
chip não chegou e nada foi testado em campo. Nenhuma projeção de ganho é publicada.

## Sobre a empresa analisada

- Razão social: ${EMPRESA.razaoSocial}
- CNPJ: ${EMPRESA.cnpj}, ativo desde ${EMPRESA.constituicao}
- Autorização Anatel: ${EMPRESA.atoAnatel}, serviços de interesse coletivo e
  restrito, prazo indeterminado, território nacional
- Processo SEI Anatel: ${EMPRESA.processoSei}
- Registro JUCESP: ${EMPRESA.jucesp}
- Sede: ${EMPRESA.endereco}

Ressalva registrada no site: o ato da Anatel autoriza serviços de telecomunicações,
mas não diz em qual dos dois modelos de rede virtual da Resolução 777/2025 a
empresa opera. O dossiê dela cita contrato com a ${EMPRESA.parceiroSmp} sobre
infraestrutura da ${EMPRESA.infraestrutura}, enquanto o material comercial anuncia
TIM e Vivo. As duas versões não fecham, e o autor não localizou documento público
que resolva.

## Páginas principais

${listaDePaginas}

## Blog

${secoesDeBlog}

## Números reais do autor como afiliado

Período de 7 de julho a 20 de outubro de 2026, com licença VIP e oito pessoas na rede:

- Comissão total gerada: R$ 146,08
- Recebido líquido após taxa de saque de 16%: R$ 115,43
- Parcela da comissão originada de entrada e licença: 96,7%
- Bônus de recorrência sobre plano de telefonia: R$ 0,00
- Comissão em outubro de 2026: R$ 0,00
- Custo mensal do plano contratado: R$ 159,80
- Resultado acumulado: negativo

## O que este site não faz

Não promete renda. Não publica projeção baseada em matriz completa. Não se
apresenta como canal oficial. Não reproduz característica de produto como fato
verificado sem ter medido.

## Conteúdo completo

O texto integral de todas as páginas está em ${SITE.url}/llms-full.txt
`;

  return new Response(texto, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
