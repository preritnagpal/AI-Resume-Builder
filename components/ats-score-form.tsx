'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader, Upload, FileText, AlertCircle, CheckCircle2, XCircle } from "lucide-react";

interface AtsScoreResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  keywordMatches: {
    present: string[];
    missing: string[];
  };
}

const ALLOWED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
};

export default function AtsScoreForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AtsScoreResult | null>(null);
  const [jobDescription, setJobDescription] = useState('Frontend Developer');
  const [demoMode] = useState(true); // Set to false for production

  // Demo result customized for Prerit's resume
  const DEMO_RESULT: AtsScoreResult = {
    score: 86,
    strengths: [
      "Strong frontend skills (HTML5, CSS3, JavaScript, Bootstrap)",
      "Relevant internship experience with measurable achievements",
      "Good educational background in computer applications",
      "Clear profile summary highlighting technical capabilities",
      "Includes quantifiable results (30% performance improvements)"
    ],
    weaknesses: [
      "Could showcase more React.js projects/experience",
      "Missing TypeScript which is important for frontend roles",
      "Limited details about testing methodologies",
      "Could include more metrics in project descriptions"
    ],
    suggestions: [
      "Add 2-3 React projects to your portfolio",
      "Include TypeScript in your skills section",
      "Add Jest/React Testing Library experience",
      "Show more GitHub contributions or open-source work",
      "Include more performance metrics in project descriptions"
    ],
    keywordMatches: {
      present: [
        "HTML5", "CSS3", "JavaScript", "Bootstrap", 
        "Frontend Developer", "Responsive Design", "SEO"
      ],
      missing: [
        "React.js", "TypeScript", "Jest", 
        "Redux", "Webpack", "CI/CD"
      ]
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ALLOWED_FILE_TYPES,
    maxFiles: 1,
  });

  const removeFile = () => {
    setFile(null);
    setResult(null);
  };

  const analyzeResume = async () => {
    if (demoMode) {
      // Show demo result immediately
      setResult(DEMO_RESULT);
      toast({
        title: "Analysis Complete",
        description: "Your resume scored 86/100 - Strong Frontend Developer profile!",
      });
      return;
    }

    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload your resume first",
        variant: "destructive",
      });
      return;
    }

    if (!jobDescription.trim()) {
      toast({
        title: "Job description required",
        description: "Please paste the job description you're targeting",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      // In real implementation, you would process the resume here
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResult(DEMO_RESULT); // Remove this line in production
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis failed",
        description: "Could not analyze your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden toggle for demo mode - remove in production */}
      <div className="hidden">
        <Label>Demo Mode Active (Customized for Frontend Roles)</Label>
      </div>

      <div className="space-y-2">
        <Label>Target Job Description</Label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description you're applying for..."
          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        />
      </div>

      <div {...getRootProps()} className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-500">Drop your resume here...</p>
        ) : (
          <div className="space-y-2">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <p className="text-sm text-gray-600">
              Drag and drop your resume here, or click to select
            </p>
            <p className="text-xs text-gray-500">
              Supported formats: PDF, DOCX (Max 5MB)
            </p>
          </div>
        )}
      </div>

      {file && (
        <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium">{file.name}</span>
            <span className="text-xs text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </Button>
        </div>
      )}

      <Button
        onClick={analyzeResume}
        disabled={(!file && !demoMode) || isLoading}
        className="w-full"
      >
        {isLoading ? (
          <Loader className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <FileText className="h-4 w-4 mr-2" />
        )}
        Analyze Resume
      </Button>

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>ATS Compatibility Score</CardTitle>
                <div className={`text-xl font-bold ${
                  result.score >= 80 ? 'text-green-600' :
                  result.score >= 60 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {result.score}/100
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={result.score} className="h-3" />
              <p className="text-sm text-gray-600 mt-2">
                {result.score >= 80 ? 'Excellent ATS match for Frontend roles!' :
                 result.score >= 60 ? 'Good, but could be improved' :
                 'Needs significant improvement to pass ATS filters'}
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.strengths.map((strength, i) => (
                    <li key={i} className="text-sm flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  Weaknesses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.weaknesses.map((weakness, i) => (
                    <li key={i} className="text-sm flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                Improvement Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.suggestions.map((suggestion, i) => (
                  <li key={i} className="text-sm">
                    <span className="font-medium">•</span> {suggestion}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Keywords Found</CardTitle>
                <p className="text-sm text-gray-600">
                  These important frontend keywords were detected in your resume
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.keywordMatches.present.map((keyword, i) => (
                    <span key={i} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Missing Keywords</CardTitle>
                <p className="text-sm text-gray-600">
                  Consider adding these important frontend keywords
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.keywordMatches.missing.map((keyword, i) => (
                    <span key={i} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}