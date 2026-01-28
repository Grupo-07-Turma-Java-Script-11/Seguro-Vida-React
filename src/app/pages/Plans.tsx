import React from "react";
import { Link } from "react-router";
import { Check } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

export function Plans() {
  const plans = [
    {
      name: "Essencial",
      subtitle: "Ideal para quem está começando",
      price: "49,90",
      popular: false,
      features: [
        "Cobertura de R$ 50.000",
        "Morte natural e acidental",
        "Invalidez permanente total",
        "Assistência funeral",
        "Sem carência para acidentes",
        "Renovação automática",
      ],
    },
    {
      name: "Família",
      subtitle: "Proteção completa para todos",
      price: "149,90",
      popular: true,
      features: [
        "Cobertura de R$ 200.000",
        "Morte natural e acidental",
        "Invalidez permanente total e parcial",
        "Doenças graves",
        "Assistência funeral premium",
        "Cobertura para cônjuge e filhos",
        "Sem carência para acidentes",
        "Renovação automática",
        "Orientação jurídica",
      ],
    },
    {
      name: "Premium",
      subtitle: "Máxima proteção e benefícios",
      price: "299,90",
      popular: false,
      features: [
        "Cobertura de R$ 500.000",
        "Morte natural e acidental",
        "Invalidez permanente total e parcial",
        "Doenças graves e críticas",
        "Assistência funeral VIP",
        "Cobertura familiar estendida",
        "Diária por internação hospitalar",
        "Antecipação de benefícios",
        "Orientação jurídica e médica",
        "Sem carência para acidentes",
        "Renovação automática garantida",
        "Suporte prioritário 24/7",
      ],
    },
  ];

  const additionalBenefits = [
    "Contratação 100% online",
    "Sem exames médicos para valores até R$ 200.000",
    "Pagamento facilitado via boleto, cartão ou débito automático",
    "Cancelamento a qualquer momento sem multa",
    "Atendimento especializado",
    "App exclusivo para acompanhamento",
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Escolha o Plano Ideal para Você
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Planos flexíveis com coberturas abrangentes para proteger você e sua família. 
            Valores a partir de R$ 49,90/mês.
          </p>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.popular
                    ? "border-blue-600 border-2 shadow-2xl scale-105"
                    : "border-gray-200 shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1 text-sm">
                      Mais Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center p-6 pb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.subtitle}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      R$ {plan.price}
                    </span>
                    <span className="text-gray-600">/mês</span>
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-0">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contato">
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-900 hover:bg-gray-800"
                      }`}
                      size="lg"
                    >
                      Contratar Agora
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Benefícios Inclusos em Todos os Planos
            </h2>
            <p className="text-lg text-gray-600">
              Vantagens exclusivas para todos os nossos clientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {additionalBenefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white p-4 rounded-lg shadow"
              >
                <Check className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
            Perguntas Frequentes
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Posso mudar de plano depois de contratar?
              </h3>
              <p className="text-gray-600">
                Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento, 
                sem burocracia.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Qual o prazo de carência?
              </h3>
              <p className="text-gray-600">
                Para morte acidental não há carência. Para morte natural, o prazo é de 24 
                meses, com cobertura parcial após 2 meses de contrato.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Preciso fazer exames médicos?
              </h3>
              <p className="text-gray-600">
                Para coberturas de até R$ 200.000, não é necessário realizar exames médicos. 
                Apenas responder a um questionário de saúde simplificado.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Como funciona o pagamento?
              </h3>
              <p className="text-gray-600">
                Você pode pagar por boleto bancário, cartão de crédito ou débito automático. 
                O valor é fixo e pode ser pago mensalmente, trimestralmente ou anualmente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ainda tem dúvidas?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Fale com nossos especialistas e descubra qual plano é perfeito para você.
          </p>
          <Link to="/contato">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Falar com Especialista
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}