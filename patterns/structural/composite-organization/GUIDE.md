# 🌳 Composite - Organizacja Firmy

## Wzorzec Composite

Wzorzec Composite należy do grupy wzorców **strukturalnych** (Structural Patterns). Pozwala na komponowanie obiektów w struktury drzewa reprezentujące hierarchie część-całość. Pozwala klientom traktować obiekty indywidualne i kompozycje jednolicie.

## Diagram Wzorca

```
       ┌─────────────┐
       │   Company   │
       └──────┬──────┘
          ┌───┴───┐
          ▼       ▼
       Dept1    Dept2
       ├──┬──   ├──┬──
       ▼  ▼     ▼  ▼
      E1 E2    E3 E4
```

## Scenario: Struktura Organizacyjna

Firma ma:

- Departamenty (mogą mieć poddepartamenty)
- Pracowników (liście drzewa)

Chcesz:

- Obliczać całkowite wynagrodzenie
- Wyświetlić strukturę
- Iterować pracowników

**Problemy bez Composite:**

```typescript
// if/switch nightmare! 😱
if (item instanceof Department) {
  // calculate subordinates
} else if (item instanceof Employee) {
  // add salary
}
```

**Rozwiązanie z Composite:**

```typescript
// Uniform interface! ✨
const total = department.getAnnualBudget();
// Niezależnie czy to Department czy Employee
```

## Komponenty

### 1. **Component Interface**

```typescript
interface Organizational {
  getAnnualBudget(): number;
  getName(): string;
}
```

### 2. **Leaf (Employee)**

```typescript
class Employee implements Organizational {
  getAnnualBudget(): number { return this.salary; }
}
```

### 3. **Composite (Department)**

```typescript
class Department implements Organizational {
  private members: Organizational[] = [];

  add(member: Organizational): void {
    this.members.push(member);
  }

  getAnnualBudget(): number {
    let total = 0;
    for (const member of this.members) {
      total += member.getAnnualBudget();
    }
    return total;
  }
}
```

## Co Implementujesz

### Krok 1: Component Interface

```typescript
interface OrganizationComponent {
  getName(): string;
  getBudget(): number;
}
```

🌳 **Dlaczego?** Gemeinsam interface

### Krok 2: Leaf

```typescript
class Employee implements OrganizationComponent {
  constructor(name: string, salary: number) {...}
  getBudget(): number { return this.salary; }
}
```

👤 **Dlaczego?** Pojedynczy element

### Krok 3: Composite

```typescript
class Department implements OrganizationComponent {
  private members: OrganizationComponent[] = [];
  add(member) { this.members.push(member); }
  getBudget(): number {
    return this.members.reduce((sum, m) => sum + m.getBudget(), 0);
  }
}
```

🏢 **Dlaczego?** Kontener elementów

## Praktyczne Zastosowania

1. **File Systems** - Files and directories
2. **Organizacje** - Departments and employees
3. **Menus** - Menu items and submenus
4. **DOM** - HTML elements hierarchy
5. **Graphics** - Shapes and groups
6. **UI** - Components and containers

## Wniosek

Wzorzec Composite pozwala:

- 🌳 Na hierarchiczną strukturę
- 💡 Na uniform treatment
- 🔄 Na recursion

---

📚 **Materiały:**

- [Refactoring.Guru - Composite](https://refactoring.guru/design-patterns/composite)
