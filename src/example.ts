import gql from 'graphql-tag';
import { Component, Vue } from 'vue-property-decorator';

import { SmartQuery } from '../src';

@Component
export class TodoList extends Vue {
  @SmartQuery({
    query: gql`
      query Todos($skip: Int, $limit: Int) {
        todos(skip: $skip, limit: $limit) {
          id
          title
        }
      }
    `,
    variables() {
      return this.vars;
    }
  })
  todos!: Todo[];

  get vars(): QueryVariables {
    return {
      limit: 10,
      skip: 0
    };
  }
}

@Component
export class TodoList1 extends TodoList {
  @SmartQuery<TodoList1>({
    query: gql`
      query Todos($skip: Int, $limit: Int) {
        todos(skip: $skip, limit: $limit) {
          id
          title
        }
      }
    `,
    variables() {
      return this.vars;
    }
  })
  todos!: Todo[];
}

@Component
export class TodoList2 extends TodoList {
  @SmartQuery<TodoList2, QueryResult>({
    query: gql`
      query Todos($skip: Int, $limit: Int) {
        todos(skip: $skip, limit: $limit) {
          id
          title
        }
      }
    `,
    variables() {
      return this.vars;
    },
    update(data) {
      // data: QueryResult
    }
  })
  todos!: Todo[];
}

@Component
export class TodoList3 extends TodoList {
  @SmartQuery<TodoList3, QueryResult, QueryVariables>({
    query: gql`
      query Todos($skip: Int, $limit: Int) {
        todos(skip: $skip, limit: $limit) {
          id
          title
        }
      }
    `,
    variables() {
      return this.vars;
    },
    update(data) {
      // data: QueryResult
    },
    subscribeToMore: [
      {
        document: gql``,
        variables() {
          return this.vars;
        }
      }
    ]
  })
  todos!: Todo[];
}

interface Todo {
  id: string;
  title: string;
}

interface QueryResult {
  todos: Todo[];
}

interface QueryVariables {
  skip?: number;
  limit?: number;
}