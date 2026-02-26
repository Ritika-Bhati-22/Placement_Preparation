export const PREP_DATA: Record<string, {
  title: string;
  qs: { c: string; t: string; a: string }[];
}> = {
  python: {
    title: "🐍 Python — Interview Questions",
    qs: [
      { c: "blue", t: "Q1. Difference between list and tuple?", a: "List is mutable, tuple is immutable. Lists use more memory. Tuples are faster. Use tuples for fixed data like coordinates." },
      { c: "purple", t: "Q2. What are decorators in Python?", a: "Functions that wrap others to extend behavior. Used with @symbol. Examples: @staticmethod, @property, @classmethod." },
      { c: "green", t: "Q3. Explain GIL in Python", a: "Global Interpreter Lock allows only one thread at a time. Use multiprocessing for CPU-bound tasks instead of threading." },
      { c: "amber", t: "Q4. What is list comprehension?", a: "[x**2 for x in range(10)] — concise list creation. Faster than loops. With conditions: [x for x in list if x > 0]." },
    ]
  },
  ml: {
    title: "🤖 Machine Learning — Interview Questions",
    qs: [
      { c: "blue", t: "Q1. What is overfitting? How to prevent?", a: "Model memorizes training data, fails on test data. Fix: Regularization (L1/L2), Cross-validation, Dropout, More data." },
      { c: "purple", t: "Q2. Bagging vs Boosting?", a: "Bagging (Random Forest): parallel, reduces variance. Boosting (XGBoost): sequential, reduces bias. Boosting usually more accurate." },
      { c: "green", t: "Q3. Precision vs Recall?", a: "Precision = TP/(TP+FP). Recall = TP/(TP+FN). Use F1 score when both matter. Recall when false negatives are costly." },
      { c: "amber", t: "Q4. Bias-variance tradeoff?", a: "High bias = underfitting. High variance = overfitting. Find sweet spot using cross-validation and regularization." },
    ]
  },
  sql: {
    title: "🗄️ SQL — Interview Questions",
    qs: [
      { c: "blue", t: "Q1. WHERE vs HAVING?", a: "WHERE filters rows BEFORE grouping. HAVING filters groups AFTER GROUP BY. Use HAVING with COUNT, SUM, AVG." },
      { c: "purple", t: "Q2. Types of JOINs?", a: "INNER: only matches. LEFT: all from left + matches. RIGHT: reverse. FULL OUTER: all rows. CROSS: every row × row." },
      { c: "green", t: "Q3. What is indexing?", a: "Speeds up SELECT but slows INSERT/UPDATE. Use on columns in WHERE, JOIN, ORDER BY frequently used." },
      { c: "amber", t: "Q4. What is a subquery?", a: "A query inside another query. Correlated subquery references outer query. Used to filter, compare, or derive values." },
    ]
  },
  stats: {
    title: "📊 Statistics — Interview Questions",
    qs: [
      { c: "blue", t: "Q1. What is p-value?", a: "Probability of getting observed results assuming null hypothesis is true. p < 0.05 = statistically significant." },
      { c: "purple", t: "Q2. Normal distribution properties?", a: "Mean=Median=Mode. Bell curve. 68% within 1σ, 95% within 2σ, 99.7% within 3σ." },
      { c: "green", t: "Q3. Central Limit Theorem?", a: "As sample size grows (n>30), distribution of sample mean approaches normal regardless of population distribution." },
      { c: "amber", t: "Q4. Type 1 vs Type 2 error?", a: "Type 1 (α): False Positive — reject null when true. Type 2 (β): False Negative — keep null when false." },
    ]
  },
  hr: {
    title: "💬 HR Questions — Personalized for Ritika",
    qs: [
      { c: "blue", t: '"Tell me about yourself"', a: '"Final year CS student skilled in Python & ML. Built Fake News Detector (92% accuracy). Looking for data-driven team."' },
      { c: "purple", t: '"Your greatest strength?"', a: '"Translating data into insights. My Student Performance Predictor used XGBoost to identify at-risk students with 87% accuracy."' },
      { c: "green", t: '"Where in 5 years?"', a: '"Senior data scientist leading ML projects. Specialize in NLP and contribute to open source AI."' },
      { c: "amber", t: '"Why should we hire you?"', a: '"I bring practical ML skills with 3 deployed projects, strong Python fundamentals, and quick learning ability."' },
    ]
  },
};