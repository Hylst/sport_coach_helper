import { Layout } from "@/components/layout/Layout";
import { UserGuide } from "@/components/guide/UserGuide";
import { Card } from "@/components/ui/card";

const Guide = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Card className="p-6">
          <UserGuide />
        </Card>
      </div>
    </Layout>
  );
};

export default Guide;