'use client';

import { useState, useCallback } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { StepIndicator } from './StepIndicator';
import { ResultsReport } from './ResultsReport';
import { WIZARD_STEPS, ASSESSMENT_QUESTIONS } from '@/data/assessmentQuestions';
import { scoreAssessment } from '@/lib/assessment';
import { cn } from '@/lib/utils';
import type { AssessmentAnswers, AssessmentResult } from '@/types/compliance';

const INITIAL_ANSWERS: AssessmentAnswers = {};

export function AssessmentWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>(INITIAL_ANSWERS);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const isResultsView = result !== null;

  const currentStepData = WIZARD_STEPS[currentStep];
  const currentQuestions = ASSESSMENT_QUESTIONS.filter(
    (q) => q.stepIndex === currentStep
  );

  const handleAnswer = useCallback(
    (questionId: string, value: string | string[] | boolean) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    []
  );

  const handleCheckboxGroup = useCallback(
    (questionId: string, value: string, checked: boolean) => {
      setAnswers((prev) => {
        const existing = (prev[questionId] as string[]) ?? [];
        if (checked) {
          return { ...prev, [questionId]: [...existing, value] };
        } else {
          return { ...prev, [questionId]: existing.filter((v) => v !== value) };
        }
      });
    },
    []
  );

  const canAdvance = currentQuestions.every((q) => {
    const answer = answers[q.id];
    if (q.inputType === 'radio') return typeof answer === 'string' && answer !== '';
    if (q.inputType === 'checkbox-group') return true; // Optional
    if (q.inputType === 'single-checkbox') return true;
    return true;
  });

  const handleNext = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Last step — score and show results
      const scored = scoreAssessment(answers);
      setResult(scored);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    setAnswers(INITIAL_ANSWERS);
    setCurrentStep(0);
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isResultsView) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <ResultsReport result={result} onRestart={handleRestart} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Step indicator */}
      <div className="mb-10">
        <StepIndicator steps={WIZARD_STEPS} currentStep={currentStep} />
      </div>

      {/* Step content */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-6">
        <h2 className="text-xl font-bold text-navy-900 mb-1">{currentStepData.title}</h2>
        <p className="text-sm text-slate-500 mb-8">{currentStepData.description}</p>

        <div className="space-y-8">
          {currentQuestions.map((question) => {
            const answer = answers[question.id];

            return (
              <div key={question.id}>
                <p className="text-sm font-semibold text-slate-800 mb-1">{question.text}</p>
                {question.helpText && (
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">{question.helpText}</p>
                )}

                {/* Radio */}
                {question.inputType === 'radio' && question.options && (
                  <div className="space-y-2">
                    {question.options.map((opt) => {
                      const selected = answer === opt.value;
                      return (
                        <label
                          key={opt.value}
                          className={cn(
                            'flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all',
                            selected
                              ? 'border-navy-900 bg-navy-900/5 ring-1 ring-navy-900'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          )}
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={opt.value}
                            checked={selected}
                            onChange={() => handleAnswer(question.id, opt.value)}
                            className="mt-0.5 shrink-0 accent-navy-900"
                          />
                          <span className="text-sm text-slate-700 leading-relaxed">{opt.label}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {/* Checkbox group */}
                {question.inputType === 'checkbox-group' && question.options && (
                  <div className="space-y-2">
                    {question.options.map((opt) => {
                      const currentValues = (answer as string[]) ?? [];
                      const checked = currentValues.includes(opt.value);
                      return (
                        <label
                          key={opt.value}
                          className={cn(
                            'flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all',
                            checked
                              ? 'border-navy-900 bg-navy-900/5 ring-1 ring-navy-900'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) =>
                              handleCheckboxGroup(question.id, opt.value, e.target.checked)
                            }
                            className="mt-0.5 shrink-0 accent-navy-900 rounded"
                          />
                          <span className="text-sm text-slate-700 leading-relaxed">{opt.label}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-xs text-slate-400 font-medium">
          {currentStep + 1} / {WIZARD_STEPS.length}
        </div>

        <button
          onClick={handleNext}
          disabled={!canAdvance}
          className={cn(
            'inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors',
            canAdvance
              ? 'bg-navy-900 text-white hover:bg-navy-700'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          )}
        >
          {currentStep === WIZARD_STEPS.length - 1 ? 'View Results' : 'Next'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
