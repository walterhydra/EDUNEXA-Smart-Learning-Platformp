
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface MentorFilterProps {
  onFilter: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  search: string;
  skills: string[];
  onlyAvailable: boolean;
}

const skillsList = [
  "Software Development",
  "Data Science",
  "UX Design",
  "Product Management",
  "Digital Marketing",
  "Financial Analysis",
  "Leadership",
  "Career Planning"
];

const MentorFilter: React.FC<MentorFilterProps> = ({ onFilter }) => {
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      search,
      skills: selectedSkills,
      onlyAvailable
    });
  };

  const handleReset = () => {
    setSearch("");
    setSelectedSkills([]);
    setOnlyAvailable(false);
    onFilter({
      search: "",
      skills: [],
      onlyAvailable: false
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search mentors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Skills</h3>
        <div className="space-y-2">
          {skillsList.map((skill) => (
            <div key={skill} className="flex items-center">
              <Checkbox
                id={`skill-${skill}`}
                checked={selectedSkills.includes(skill)}
                onCheckedChange={() => handleSkillToggle(skill)}
              />
              <Label htmlFor={`skill-${skill}`} className="ml-2 cursor-pointer">
                {skill}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center">
        <Checkbox
          id="available"
          checked={onlyAvailable}
          onCheckedChange={() => setOnlyAvailable(!onlyAvailable)}
        />
        <Label htmlFor="available" className="ml-2 cursor-pointer">
          Show only available mentors
        </Label>
      </div>

      <div className="flex space-x-4">
        <Button type="submit" className="flex-1">
          Apply Filters
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          className="flex-1"
        >
          Reset
        </Button>
      </div>
    </form>
  );
};

export default MentorFilter;
