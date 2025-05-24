---
title: Translations
description: Different languages for your documentation
---

Currently, the documentation supports two languages: Spanish and English. To change the language of your documentation, translations help your readers better understand your documentation beyond their native language.

## Usage

To enable translations, you need to add the languages used in your configuration file. You also need to specify the default language and the language of the documentation.

```toml
languageCode = 'es'
defaultContentLanguage = 'es'

[languages]
  [languages.es]
    languageName = "Español"
    weight = 1

  [languages.en]
    languageName = "English"
    weight = 2
```

## Translate

Create a file with the same name as the page you want to translate, but with the language extension. For example, if you want to translate the `index.md` page into English, you should create a file named `index.en.md`.

```text
content
└── 1.0
    └── index.md
    └── index.en.md
```
