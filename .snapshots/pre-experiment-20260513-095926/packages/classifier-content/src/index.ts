import { classifiers as rawClassifiers } from '../../../content/classifiers'
import { classifierDecks } from '../../../content/classifier-decks'
import type {
  AppLocale,
  Classifier,
  ClassifierDeck
} from '@sinographic-engine/shared-types'
import {
  localizeClassifier,
  localizeClassifierDeckWithCount
} from './localization'
import { parseClassifierDataset } from './validation'

export const classifiers: Classifier[] = parseClassifierDataset(rawClassifiers)

export const getClassifierById = (id: string) => {
  return classifiers.find((classifier) => classifier.id === id)
}

export const getLocalizedClassifierById = (id: string, locale: AppLocale) => {
  const classifier = getClassifierById(id)

  return classifier ? localizeClassifier(classifier, locale) : undefined
}

export const getClassifierDeckById = (deckId: string) => {
  return classifierDecks.find((deck) => deck.id === deckId)
}

export const getLocalizedClassifiers = (locale: AppLocale): Classifier[] => {
  return classifiers.map((classifier) => localizeClassifier(classifier, locale))
}

export const getClassifiersForDeck = (deckId: string): Classifier[] => {
  const deck = getClassifierDeckById(deckId)

  if (!deck) {
    return classifiers
  }

  return classifiers.filter((classifier) =>
    deck.classifierHanzi.includes(classifier.hanzi)
  )
}

export const getLocalizedClassifiersForDeck = (
  deckId: string,
  locale: AppLocale
): Classifier[] => {
  return getClassifiersForDeck(deckId).map((classifier) =>
    localizeClassifier(classifier, locale)
  )
}

export const getClassifierDecks = (): Array<
  ClassifierDeck & { availableCount: number }
> => {
  return classifierDecks.map((deck) => ({
    ...deck,
    availableCount: getClassifiersForDeck(deck.id).length
  }))
}

export const getLocalizedClassifierDecks = (
  locale: AppLocale
): Array<ClassifierDeck & { availableCount: number }> => {
  return getClassifierDecks().map((deck) =>
    localizeClassifierDeckWithCount(deck, locale)
  )
}

export * from './localization'
export * from './validation'
