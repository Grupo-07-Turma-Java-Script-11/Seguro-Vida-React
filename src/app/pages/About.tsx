import React from "react";
import { Shield, Award, Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";

export function About() {
  const stats = [
    { icon: Users, value: "500k+", label: "Clientes Ativos" },
    // { icon: Award, value: "25+", label: "Anos de Experiência" },
    { icon: Shield, value: "98%", label: "Satisfação" },
    { icon: TrendingUp, value: "R$ 2bi", label: "Em Indenizações Pagas" },
  ];

  const values = [
    {
      title: "Transparência",
      description: "Comunicação clara e honesta em todas as nossas relações com clientes e parceiros.",
    },
    {
      title: "Compromisso",
      description: "Dedicação total em cumprir nossas promessas e estar presente quando você mais precisa.",
    },
    {
      title: "Inovação",
      description: "Constantemente buscando novas soluções para melhor atender nossos clientes.",
    },
    {
      title: "Empatia",
      description: "Compreendemos que cada história é única e tratamos cada caso com cuidado e atenção.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Sobre a Vitalis Seguro
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Desde 2025, construímos uma história de confiança e proteção,
              ajudando milhares de famílias brasileiras a garantirem seu futuro com
              tranquilidade e segurança.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center text-center">
                <div className="inline-flex p-4 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="size-8 text-blue-600" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Nossa Missão
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Proteger o que é mais importante na vida das pessoas, oferecendo soluções
                de seguro de vida que proporcionem segurança financeira e tranquilidade
                para nossos clientes e suas famílias.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Acreditamos que cada família merece ter acesso a proteção de qualidade,
                independente do momento de vida em que se encontram. Por isso, trabalhamos
                incansavelmente para oferecer planos flexíveis, justos e transparentes.
              </p>
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Nossa Visão
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Ser a seguradora de vida mais confiável e admirada do Brasil, reconhecida
                pela excelência no atendimento e pelo compromisso genuíno com o bem-estar
                de nossos clientes.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Queremos ser a primeira escolha quando as famílias brasileiras pensam em
                proteção e segurança financeira, construindo relacionamentos duradouros
                baseados em confiança e transparência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nossos Valores
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Princípios que guiam todas as nossas ações e decisões.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Uma História de Confiança
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Desde 2025, a Vitalis Seguro vem transformando a vida de milhares de famílias
              brasileiras. Nossa jornada começou com um objetivo simples: tornar o seguro
              de vida acessível e compreensível para todos.
            </p>
            <p className="text-lg text-blue-100 leading-relaxed">
              Ao longo dos anos, crescemos e evoluímos, mas nosso compromisso permanece o
              mesmo: estar ao lado de nossos clientes nos momentos mais importantes de suas
              vidas, oferecendo proteção, apoio e tranquilidade.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}