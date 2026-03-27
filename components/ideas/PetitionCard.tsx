// components/PetitionCard.tsx
import { Card, Text, Progress, Group, Button, Badge, Avatar } from '@mantine/core';
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
} from 'lucide-react';

type Category = 'EKOLOGIA' | 'TRANSPORT' | 'EDUKACJA' | 'ZDROWIE' | 'INFRASTRUKTURA' | 'CYFRYZACJA';

interface PetitionCardProps {
  category: Category;
  title: string;
  description: string;
  author: string;
  authorVerified?: boolean;
  progress: number;
  signaturesNeeded: number;
  onSupport: () => void;
  onDislike: () => void;
  onComment: () => void;
}

const categoryColors: Record<Category, string> = {
  EKOLOGIA: 'bg-teal-100 text-teal-700 border-teal-200',
  TRANSPORT: 'bg-orange-100 text-orange-700 border-orange-200',
  EDUKACJA: 'bg-blue-100 text-blue-700 border-blue-200',
  ZDROWIE: 'bg-red-100 text-red-700 border-red-200',
  INFRASTRUKTURA: 'bg-purple-100 text-purple-700 border-purple-200',
  CYFRYZACJA: 'bg-violet-100 text-violet-700 border-violet-200',
};

export default function PetitionCard({
  category,
  title,
  description,
  author,
  authorVerified = false,
  progress,
  signaturesNeeded,
  onSupport,
  onDislike,
  onComment,
}: PetitionCardProps) {
  return (
    <Card 
      withBorder 
      shadow="sm" 
      radius="lg" 
      className="overflow-hidden bg-white hover:shadow-md transition-all duration-200"
    >
      {/* Górny pasek z kategorią i znacznikami */}
      <div className="flex items-center justify-between mb-3">
        <Badge 
          className={`${categoryColors[category]} font-medium px-3 py-1`}
          variant="light"
          size="sm"
        >
          {category}
        </Badge>

      </div>

      {/* Tytuł */}
      <Text fw={600} size="lg" className="leading-tight mb-2 line-clamp-2">
        {title}
      </Text>

      {/* Opis */}
      <Text size="sm" c="dimmed" className="line-clamp-3 mb-4">
        {description}
      </Text>

      {/* Autor */}
      <Group mb="md">
        <Avatar size="sm" radius="xl" color="gray">
          {author.charAt(0)}
        </Avatar>
        <div>
          <Text size="sm" fw={500} className="flex items-center gap-1">
            {author}
            {authorVerified && <span className="text-blue-600 text-xs">✓</span>}
          </Text>
        </div>
      </Group>

      {/* Postęp */}
      <div className="mb-5">
        <div className="flex justify-between text-sm mb-1.5">
          <span className="font-medium">Postęp: {progress}%</span>
          <span className="text-gray-500">
            Brakuje: {signaturesNeeded.toLocaleString()} podpisów
          </span>
        </div>
        <Progress 
          value={progress} 
          size="sm" 
          radius="xl" 
          color={
            category === 'EKOLOGIA' ? 'teal' :
            category === 'TRANSPORT' ? 'orange' :
            category === 'EDUKACJA' ? 'blue' :
            category === 'ZDROWIE' ? 'red' :
            category === 'INFRASTRUKTURA' ? 'purple' : 'violet'
          }
        />
      </div>

      {/* Przyciski akcji */}
      <Group grow>
        <Button 
          variant="light" 
          color="green" 
          onClick={onSupport}
          className="font-medium"
        >
            <ThumbsUp size={22} strokeWidth={2.25} />
        </Button>

        <Button 
          variant="light" 
          color="red" 
          onClick={onDislike}
          className="font-medium"
        >
            <ThumbsDown size={22} strokeWidth={2.25} />
        </Button>

        <Button 
          variant="light" 
          color="gray" 
          onClick={onComment}
          className="font-medium"
        >
            <MessageCircle size={22} strokeWidth={2.25} />
        </Button>
      </Group>
    </Card>
  );
}