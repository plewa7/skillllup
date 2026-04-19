/**
 * WZORZEC COMPOSITE - Implementacja
 */

// ============================================
// 1. COMPONENT INTERFACE
// ============================================
interface OrganizationComponent {
  getName(): string;
  getAnnualBudget(): number;
  display(indent: string): string;
  add?(component: OrganizationComponent): void;
  remove?(component: OrganizationComponent): void;
}

// ============================================
// 2. LEAF (Employee)
// ============================================
class Employee implements OrganizationComponent {
  constructor(
    private name: string,
    private salary: number
  ) {}

  getName(): string {
    return this.name;
  }

  getAnnualBudget(): number {
    return this.salary * 12;
  }

  display(indent: string): string {
    return `${indent}👤 ${this.name} - Roczne wynagrodzenie: ${(this.salary * 12).toLocaleString('pl-PL')} PLN`;
  }
}

// ============================================
// 3. COMPOSITE (Department)
// ============================================
class Department implements OrganizationComponent {
  private members: OrganizationComponent[] = [];

  constructor(private name: string) {}

  getName(): string {
    return this.name;
  }

  add(component: OrganizationComponent): void {
    this.members.push(component);
  }

  remove(component: OrganizationComponent): void {
    const index = this.members.indexOf(component);
    if (index > -1) {
      this.members.splice(index, 1);
    }
  }

  getAnnualBudget(): number {
    let total = 0;
    for (const member of this.members) {
      total += member.getAnnualBudget();
    }
    return total;
  }

  display(indent: string): string {
    let result = `${indent}🏢 ${this.name}\n`;
    for (const member of this.members) {
      result += member.display(indent + '  ') + '\n';
    }
    result += `${indent}📊 Budżet departamentu: ${this.getAnnualBudget().toLocaleString('pl-PL')} PLN`;
    return result;
  }

  getMembers(): OrganizationComponent[] {
    return [...this.members];
  }
}

// ============================================
// 4. BUILD ORGANIZATION STRUCTURE
// ============================================
function buildOrganization(): Department {
  const company = new Department('Firma ABC');

  const devDept = new Department('Dział Developerski');
  devDept.add(new Employee('Jan Kowalski', 8000));
  devDept.add(new Employee('Maria Nowak', 7500));
  devDept.add(new Employee('Piotr Lewandowski', 9000));

  const hrDept = new Department('Dział HR');
  hrDept.add(new Employee('Anna Wójcik', 5000));
  hrDept.add(new Employee('Tomasz Zając', 4800));

  const salesDept = new Department('Dział Sprzedaży');
  salesDept.add(new Employee('Krzysztof Malinowski', 6000));
  salesDept.add(new Employee('Beata Szymańska', 5500));

  company.add(devDept);
  company.add(hrDept);
  company.add(salesDept);

  return company;
}

// ============================================
// 5. UI HELPERS
// ============================================
function displayOrganization(org: Department): void {
  const output = document.getElementById('output');
  if (output) {
    const pre = document.createElement('pre');
    pre.className = 'organization-tree';
    pre.textContent = org.display('');
    output.innerHTML = '';
    output.appendChild(pre);
  }
}

function displayBudget(org: Department): void {
  const budgetDiv = document.getElementById('budget-info');
  if (budgetDiv) {
    budgetDiv.innerHTML = `<strong>Całkowity budżet firmy:</strong> ${org.getAnnualBudget().toLocaleString('pl-PL')} PLN`;
  }
}

function displayDepartmentsList(org: Department): void {
  const list = document.getElementById('departments-list');
  if (list) {
    list.innerHTML = '';
    function addDepartments(dept: Department, level = 0) {
      const item = document.createElement('div');
      item.style.marginLeft = level * 20 + 'px';
      item.textContent = `${'├─'.repeat(level)} ${dept.getName()} (Budżet: ${dept.getAnnualBudget().toLocaleString('pl-PL')} PLN)`;
      list!.appendChild(item);

      for (const member of dept.getMembers()) {
        if (member instanceof Department) {
          addDepartments(member, level + 1);
        } else if (member instanceof Employee) {
          const empItem = document.createElement('div');
          empItem.style.marginLeft = (level + 1) * 20 + 'px';
          empItem.style.color = '#666';
          empItem.textContent = `├─ ${member.getName()} (${member.getAnnualBudget().toLocaleString('pl-PL')} PLN/rok)`;
          list!.appendChild(empItem);
        }
      }
    }
    addDepartments(org);
  }
}

// ============================================
// 6. INICJALIZACJA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const organization = buildOrganization();

  const displayBtn = document.getElementById('display-btn') as HTMLButtonElement;
  const budgetBtn = document.getElementById('budget-btn') as HTMLButtonElement;
  const listBtn = document.getElementById('list-btn') as HTMLButtonElement;

  if (displayBtn) {
    displayBtn.addEventListener('click', () => {
      displayOrganization(organization);
    });
  }

  if (budgetBtn) {
    budgetBtn.addEventListener('click', () => {
      displayBudget(organization);
    });
  }

  if (listBtn) {
    listBtn.addEventListener('click', () => {
      displayDepartmentsList(organization);
    });
  }

  // Display by default
  displayBtn?.click();
  budgetBtn?.click();
});
