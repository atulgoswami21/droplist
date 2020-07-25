// @flow

import React from "react";
import PageLayout from "../../style-guide/page-layout";
import useFetch from "use-http";
import { StyledSpinnerNext as Spinner } from "baseui/spinner";
import type { Template } from "../../lib/types/content";
import { useStyletron } from "baseui";
import { Display3, Label2, Paragraph3 } from "baseui/typography";
import { Button, KIND, SIZE } from "baseui/button";
import { Spacer40, Spacer8 } from "../../style-guide/spacer";
import { Table } from "baseui/table-semantic";
import { DateTime } from "luxon";
import TemplateActionMenu from "./action-menu";
import CreateTemplateButton from "./create-button";

const TemplatesPage = () => {
  const [css] = useStyletron();
  const { get, loading, error, data: templates } = useFetch<Template[]>(
    "/content/templates",
    {},
    []
  );

  if (loading) {
    return (
      <PageLayout>
        <Spinner />
      </PageLayout>
    );
  }

  if (error) {
    return <PageLayout>Failed to load this page. Please try again.</PageLayout>;
  }

  return (
    <PageLayout>
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        })}
      >
        <div>
          <Display3>Templates</Display3>
        </div>
        <CreateTemplateButton />
      </div>
      <Spacer40 />
      <Table
        columns={["", "", ""]}
        data={templates.map((t) => [
          null,
          <div className={css({ paddingTop: "20px" })}>
            <Label2>{t.Name}</Label2>
            <Paragraph3>
              {t.Subject && (
                <>
                  {t.Subject}
                  <br />
                </>
              )}
              Last updated on{" "}
              {DateTime.fromISO(t.UpdatedAt).toLocaleString(
                DateTime.DATETIME_SHORT
              )}
            </Paragraph3>
          </div>,
          <div
            className={css({
              display: "flex",
              float: "right",
              paddingTop: "20px",
            })}
          >
            <TemplateActionMenu template={t} onUpdate={get} />
            <Spacer8 />
            <Button size={SIZE.compact} kind={KIND.secondary}>
              Create Campaign
            </Button>
          </div>,
        ])}
        overrides={{
          TableHead: {
            style: { display: "none" },
          },
          TableBodyRow: {
            style: { ":hover": { backgroundColor: "inherit" } },
          },
        }}
      />
    </PageLayout>
  );
};

export default TemplatesPage;
