import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, CircularProgress } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { Center } from "../common/Center";
import { get{{pluralModelNamePascal}} } from "../../api/{{modelNameCamel}}";
import { DataGrid } from "@material-ui/data-grid";
import { Header } from "../../components/common/Header";

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
    {{#isString}}
    {{#isPrimary}}
    {
      field: "{{propertyNameCamel}}",
      headerName: "{{propertyName}}",
      flex: 1,
      renderCell: ({ row: {{modelNameCamel}} }) => {
        return (
          <Link to={`/{{modelNameCamel}}/{{=<% %>=}}${<%modelNameCamel%>.id}<%={{ }}=%>`}>
            {{=<% %>=}}{<%modelNameCamel%>.<%propertyNameCamel%><%={{ }}=%> !== "" ? {{modelNameCamel}}.{{propertyNameCamel}} : "--"}
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
      flex: 1,
    },
    {{/isPrimary}}
    {{/isString}}
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

  const headerIcon = { Icon: AddIcon, to: "{{modelNamePascal}}", label: "add" };

  return (
    <Container
      maxWidth="sm"
      className="Container Collection {{modelNamePascal}}Collection"
    >
      <Header title="{{pluralModelName}}" icon={headerIcon}/>
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
