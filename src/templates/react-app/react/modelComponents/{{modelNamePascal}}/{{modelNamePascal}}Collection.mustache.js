import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, CircularProgress } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { Center } from "../common/Center";
import { get{{pluralModelNamePascal}} } from "../../api/{{modelNameCamel}}";
import { DataGrid } from "@material-ui/data-grid";
import { Header } from "../../components/common/Header";
{{#componentImports}}
import { {{component.cell}} } from '../types/{{component.cell}}';
{{/componentImports}}

function loading() {
  return (
    <Container
      maxWidth="sm"
      className="Container Collection {{modelNamePascal}}Collection"
    >
      <Header title="{{pluralModelName}}"/>
      <Center className="loading">
        <CircularProgress />
      </Center>
    </Container>
  );
}

function getColumns() {
  return [
    {{#properties}}
    {{#isPrimary}}
    {
      field: "{{propertyNameCamel}}",
      headerName: "{{propertyName}}",
      flex: {{flex}},
      renderCell: ({ row: {{modelNameCamel}} }) => {
        return (
          <Link to={`/{{modelNameCamel}}/{{=<% %>=}}${<%modelNameCamel%>.id}<%={{ }}=%>`}>
            <{{component.cell}} value={{=<% %>=}}{<%modelNameCamel%>.<%propertyNameCamel%>}<%={{ }}=%> />
          </Link>
        );
      },
    },
    {{/isPrimary}}
    {{^isPrimary}}
    {
      field: "{{propertyNameCamel}}",
      headerName: "{{propertyName}}",
      hide: {{hide}},
      flex: {{flex}},
      renderCell: ({ row: {{modelNameCamel}} }) => {
        return (
          <{{component.cell}} value={{=<% %>=}}{<%modelNameCamel%>.<%propertyNameCamel%>}<%={{ }}=%> />
        );
      },
    },
    {{/isPrimary}}
    {{/properties}}
  ];
}

export function {{modelNamePascal}}Collection() {
  const [{{pluralModelNameCamel}}, set{{pluralModelNamePascal}}] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    setIsLoading(true);
    const {{pluralModelNameCamel}} = await get{{pluralModelNamePascal}}();
    console.log({{=<% %>=}}{<%pluralModelNameCamel%>}<%={{ }}=%>);
    set{{pluralModelNamePascal}}({{pluralModelNameCamel}});
    setIsLoading(false);
  }

  if (isLoading) {
    return loading();
  }

  const actions = [{ Icon: AddIcon, to: "{{modelNamePascal}}", label: "Add" }];

  return (
    <Container
      maxWidth="sm"
      className="Container Collection {{modelNamePascal}}Collection"
    >
      <Header title="{{pluralModelName}}" actions={actions}/>
      <div style={{=<% %>=}}{{ display: "flex", height: "100%" }}<%={{ }}=%>>
        <div className="test" style={{=<% %>=}}{{ flexGrow: 1 }}<%={{ }}=%>>
          <DataGrid
            columns={getColumns()}
            rows={{=<% %>=}}{<%pluralModelNameCamel%>}<%={{ }}=%>
            className="datagrid"
            disableSelectionOnClick
          />
        </div>
      </div>
    </Container>
  );
}
