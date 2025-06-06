
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

interface PlayerNameInputProps {
  onPlayerSet: (name: string) => void;
}

const PlayerNameInput: React.FC<PlayerNameInputProps> = ({ onPlayerSet }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onPlayerSet(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <User className="w-6 h-6" />
            Welcome to City Explorer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="playerName" className="block text-sm font-medium mb-2">
                Enter your name to start playing:
              </label>
              <Input
                id="playerName"
                type="text"
                placeholder="Your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full" disabled={!name.trim()}>
              Start Game
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerNameInput;
