import React from "react";
import { Link } from "react-router";
import { Shield, Heart, Users, Phone, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";

export function Home() {
  const benefits = [
    {
      icon: Shield,
      title: "Proteção Completa",
      description: "Cobertura abrangente para você e sua família em todas as situações.",
    },
    {
      icon: Heart,
      title: "Cuidado Personalizado",
      description: "Atendimento humanizado com foco nas suas necessidades específicas.",
    },
    {
      icon: Users,
      title: "Planos Flexíveis",
      description: "Opções que se adaptam ao seu momento de vida e orçamento.",
    },
    {
      icon: Phone,
      title: "Suporte 24/7",
      description: "Assistência disponível a qualquer hora, todos os dias do ano.",
    },
  ];

  const features = [
    "Cobertura para morte natural e acidental",
    "Indenização por invalidez permanente",
    "Assistência funeral incluída",
    "Cobertura para doenças graves",
    "Sem carência para morte acidental",
    "Renovação automática garantida",
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Proteja o que é mais importante
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Garanta a segurança financeira da sua família com os melhores planos de seguro de vida do mercado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/planos">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white w-full sm:w-auto">
                    Ver Planos
                    <ArrowRight className="ml-2 size-5" />
                  </Button>
                </Link>
                <Link to="/contato">
                  <Button size="lg" variant="outline" className="border-white text-black hover:bg-blue-600 hover:text-white w-full sm:w-auto">
                    Falar com Especialista
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1618218168350-6e7c81151b64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlJTIwaW5zdXJhbmNlJTIwY29uc3VsdGF0aW9uJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2OTYxOTU2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Consultoria de seguro de vida"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher a Vitalis Seguros?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mais de 25 anos protegendo famílias brasileiras com excelência e dedicação.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                    <benefit.icon className="size-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1769483713324-6384818046ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBmdXR1cmUlMjBwbGFubmluZ3xlbnwxfHx8fDE3Njk1NDMzMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Planejamento familiar"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Cobertura completa para você e sua família
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nossos planos oferecem proteção abrangente com benefícios que realmente fazem a diferença quando você mais precisa.
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="size-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <Link to="/planos" className="inline-block mt-8">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Conhecer Planos Completos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Pronto para proteger seu futuro?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Entre em contato conosco e descubra o plano ideal para você e sua família.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contato">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto">
                Login
              </Button>
            </Link>
            <Link to="/planos">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                Ver Todos os Planos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}