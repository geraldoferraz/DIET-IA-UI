import { useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useMealPlan } from '../../../../../hooks/useMealPlan';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit2, Download, Printer } from "lucide-react";

export function MealPlanDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mealPlan, loading, error, updateMealPlan } = useMealPlan(id);

  useEffect(() => {
    if (!id) {
      navigate('/home');
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p>Carregando detalhes do plano...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          <p>Erro ao carregar plano: {error.message}</p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/home')}
            className="mt-4"
          >
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  if (!mealPlan) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>Plano não encontrado</p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/home')}
            className="mt-4"
          >
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate('/home')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{mealPlan.title}</h1>
              <p className="text-muted-foreground mt-1">
                Plano alimentar criado em {new Date(mealPlan.createdAt).toLocaleDateString()}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button size="sm">
                <Edit2 className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-6">
            {mealPlan.breakfast && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Café da Manhã</h2>
                <p>{mealPlan.breakfast}</p>
              </div>
            )}

            {mealPlan.lunch && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Almoço</h2>
                <p>{mealPlan.lunch}</p>
              </div>
            )}

            {mealPlan.dinner && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Jantar</h2>
                <p>{mealPlan.dinner}</p>
              </div>
            )}

            {mealPlan.snacks && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Lanches</h2>
                <p>{mealPlan.snacks}</p>
              </div>
            )}

            {mealPlan.notes && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Observações</h2>
                <p>{mealPlan.notes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 