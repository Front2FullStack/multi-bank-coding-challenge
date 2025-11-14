import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink } from "lucide-react";

interface NewsCardProps {
  title: string;
  source: string;
  time: string;
  category: string;
  url: string;
}

const NewsCard = ({ title, source, time, category, url }: NewsCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50 bg-gradient-to-br from-card to-card/80 group cursor-pointer">
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="flex items-start justify-between mb-3">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20"
          >
            {category}
          </Badge>
          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="font-medium">{source}</span>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>
        </div>
      </a>
    </Card>
  );
};

export default NewsCard;
