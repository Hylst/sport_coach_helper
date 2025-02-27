import { supabase } from "@/integrations/supabase/client";

const createSamplePayments = (userId: string, clientsData: any[]) => [
  {
    coach_id: userId,
    client_id: clientsData[0].id,
    amount: 100,
    payment_date: new Date().toISOString(),
    payment_method: "cb",
    status: "paid",
    notes: "Paiement pour 5 séances"
  },
  {
    coach_id: userId,
    client_id: clientsData[1].id,
    amount: 150,
    payment_date: new Date().toISOString(),
    payment_method: "virement",
    status: "paid",
    notes: "Forfait mensuel"
  },
  {
    coach_id: userId,
    client_id: clientsData[2].id,
    amount: 80,
    payment_date: new Date().toISOString(),
    payment_method: "especes",
    status: "paid",
    notes: "Cours particulier"
  }
];

export const insertSampleData = async () => {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Not authenticated");

  // Create sample clients first
  const clients = [
    {
      coach_id: userData.user.id,
      first_name: "Marie",
      last_name: "Dubois",
      email: "marie.dubois@example.com"
    },
    {
      coach_id: userData.user.id,
      first_name: "Pierre",
      last_name: "Martin",
      email: "pierre.martin@example.com"
    },
    {
      coach_id: userData.user.id,
      first_name: "Sophie",
      last_name: "Laurent",
      email: "sophie.laurent@example.com"
    }
  ];

  const { data: clientsData, error: clientsError } = await supabase
    .from("clients")
    .insert(clients)
    .select();

  if (clientsError) throw clientsError;

  if (clientsData) {
    // Create sample payments
    const payments = createSamplePayments(userData.user.id, clientsData);
    const { error: paymentsError } = await supabase
      .from("payments")
      .insert(payments);

    if (paymentsError) throw paymentsError;
  }

  return {
    message: "Données d'exemple insérées avec succès"
  };
};